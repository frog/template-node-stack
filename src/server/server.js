import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Webpack from 'webpack';
import koaWebpack from 'koa-webpack';
import serve from 'koa-static';
import { trace, centralizedErrorHandler } from './middleware';
import api from './api/api.router';
import graph from './api/graph.router';
import config from '../../webpack.config.js';

const app = new Koa();
app.on('error', centralizedErrorHandler('error'));
app.on('warn', centralizedErrorHandler('warn'));

app.use(trace());
app.use(bodyParser());

config.mode = 'development';
const compiler = Webpack(config);
const webpackMdw = koaWebpack({ compiler });
webpackMdw.then(middleware => {
    app.use(middleware);
});

app.use(serve('./dist/public'));
app.use(api.routes());
app.use(graph.routes());

export default app;
