import { graphiqlKoa } from 'apollo-server-koa'
import Router from 'koa-router'
import logger from 'utils/logger'

import koaMiddleware from 'api/modules/graphqlHelper'
import env, { Environment } from 'constants/env'

const graphql = new Router();

(async () => {
    if (env.NODE_ENV === Environment.Test) {
        return
    }
    logger.info(`Initializing GraphQL for environment >${env.NODE_ENV}<`)
    const middleware = await koaMiddleware()
    if (middleware !== undefined) {
        graphql.post('/graph', middleware)

        // Setup the /graphiql route to show the GraphiQL UI
        const enabled = env.NODE_ENV !== Environment.Production
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
