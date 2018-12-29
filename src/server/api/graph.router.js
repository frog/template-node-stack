import Router from 'koa-router';
import { graphiqlKoa } from 'apollo-server-koa';

import koaMiddleware from 'api/modules/graphqlHelper';
import env from '../constants/env';

const graphql = new Router();

(async () => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  const middleware = await koaMiddleware();
  if (middleware !== undefined) {
    graphql.post('/graph', middleware);

    // Setup the /graphiql route to show the GraphiQL UI
    const enabled = env.NODE_ENV !== 'production';
    if (enabled) {
      graphql.get(
        '/graphiql',
        graphiqlKoa({
          endpointURL: '/graph'
        })
      );
    }
  }
})();

export default graphql;
