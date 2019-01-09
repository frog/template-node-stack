import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa'
import env, { Environment } from 'constants/env'
import { ILogger, makeExecutableSchema } from 'graphql-tools'
import Router from 'koa-router'
import logger from 'utils/logger'

import { resolvers, typeDefs } from 'api/graphql'

const resolverOptions = {
  requireResolversForArgs: true,
  // requireResolversForNonScalar: true,
  // requireResolversForAllFields: true,
  requireResolversForResolveType: true,
  allowResolversNotInSchema: true
}

const logObj: ILogger = {
  log: (e) => {
    if (e instanceof Error) {
      logger.error('GQL', e)
    } else {
      logger.error(`GQL ${e}`)
    }
  }
}
const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
  allowUndefinedInResolve: false,
  resolverValidationOptions: resolverOptions,
  schemaDirectives: {},
  logger: logObj,
  inheritResolversFromInterfaces: false
})

const koaMiddleware = async () => graphqlKoa({ schema: executableSchema })

const graphql = new Router();

(async () => {
  if (env.NODE_ENV === Environment.test) {
    return
  }
  logger.info(`Initializing GraphQL for environment >${env.NODE_ENV}<`)
  const middleware = await koaMiddleware()
  if (middleware !== undefined) {
    graphql.post('/graph', middleware)

    // Setup the /graphiql route to show the GraphiQL UI
    const enabled = env.NODE_ENV !== Environment.production
    if (enabled) {
      graphql.get(
        '/graphiql',
        graphiqlKoa({
          endpointURL: '/graph'
        })
      )
    }
  }
})()

export default graphql
