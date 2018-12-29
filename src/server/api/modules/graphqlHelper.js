import { makeExecutableSchema } from 'graphql-tools';
import { graphqlKoa } from 'apollo-server-koa';

import { typeDefs, resolvers } from '../../api/graphql';

const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

const koaMiddleware = async () => graphqlKoa({ schema: executableSchema });

export default koaMiddleware;
