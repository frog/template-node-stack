import env, { Environment } from 'constants/env'
import Koa, { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import jwt from 'koa-jwt'
import serve from 'koa-static'
import logger from 'utils/logger'
import api from './api/api.router'
import graph from './api/graph.router'
import { centralizedErrorHandler, koaWebpack, trace } from './middleware'

const app = new Koa()
app.on('error', centralizedErrorHandler('error'))
app.on('warn', centralizedErrorHandler('warn'))

app.use(trace())
app.use(bodyParser())

logger.info(`Starting server with env ${env.NODE_ENV}`)

if (env.NODE_ENV !== Environment.production) {
  koaWebpack().then((middleware: Middleware) => {
    app.use(middleware)
  })
}

app.use(serve('./dist/public'))
app.use(jwt({ secret: env.JWT_TOKEN_KEY, passthrough: true }))
app.use(api.routes())
app.use(graph.routes())

export default app
