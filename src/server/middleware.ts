import Koa, { Middleware } from 'koa'
import compose from 'koa-compose'
import logger from './utils/logger'

const access = () => async (ctx: Koa.Context, next: () => Promise<any>) => {
  const { path } = ctx.request
  const logRequest = !path.includes('/ping')

  if (logRequest) {
    logger.info(`received request ${ctx.method} "${ctx.url}"`)
  }

  await next()
}

const onError = () => async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    let message = !err.status ? 'Internal Server Error' : err.message

    if (typeof message === 'string') {
      message = { message }
    }

    ctx.body = message
    if (ctx.status >= 500) {
      ctx.app.emit('error', err, ctx)
    } else {
      ctx.app.emit('warn', err, ctx)
    }
  }
}

export const trace = () => compose([access(), onError()])
export const centralizedErrorHandler = (level: string) => async (err: { message?: string }) => {
  logger[level as keyof typeof logger](err.message || 'empty', err)
}

export const koaWebpack = (): Promise<Middleware> => {
  const config = require('../../webpack.config.js')
  config.mode = 'development'
  const compiler = require('webpack')(config)
  return require('koa-webpack')({ compiler })
}
