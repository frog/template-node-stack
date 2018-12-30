import { graphqlKoa } from 'apollo-server-koa'
import { makeExecutableSchema } from 'graphql-tools'

import { resolvers, typeDefs } from 'api/graphql'

const executableSchema = makeExecutableSchema({ typeDefs, resolvers })

const koaMiddleware = async () => graphqlKoa({ schema: executableSchema })

export default koaMiddleware
