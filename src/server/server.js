import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import { trace, centralizedErrorHandler } from './middleware';
import api from './api/api.router';
import graph from './api/graph.router';

const app = new Koa();
app.on('error', centralizedErrorHandler('error'));
app.on('warn', centralizedErrorHandler('warn'));

app.use(trace());
app.use(bodyParser());
app.use(api.routes());
app.use(graph.routes());

export default app;
