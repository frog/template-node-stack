import env, { Environment } from 'constants/env'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import koaWebpack from 'koa-webpack'
import logger from 'utils/logger'
import Webpack from 'webpack'
import config from '../../webpack.config.js'
import api from './api/api.router'
import graph from './api/graph.router'
import { centralizedErrorHandler, trace } from './middleware'

const app = new Koa()
app.on('error', centralizedErrorHandler('error'))
app.on('warn', centralizedErrorHandler('warn'))

app.use(trace())
app.use(bodyParser())

logger.info(`Starting server with env ${env.NODE_ENV}`)
const a = {
  ignore: [0,
    1,
    2,
    3,
    -1,
    -2,
    -3
  ],
  ignoreArrayIndexes: true,
  enforceConst: true,
  detectObjects: false
}
if (env.NODE_ENV !== Environment.production) {
  config.mode = 'development'
  const compiler = Webpack(config)
  const webpackMdw = koaWebpack({ compiler })
  webpackMdw.then((middleware) => {
    app.use(middleware)
  })
}

app.use(serve('./dist/public'))
app.use(api.routes())
app.use(graph.routes())

export default app
