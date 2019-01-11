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

// https: // login.microsoftonline.com/0718bda8-c8f8-478e-9170-42e00d108870/oauth2/authorize?client_id=00000003-0000-0ff1-ce00-000000000000&response_mode=form_post&response_type=code%20id_token&resource=00000003-0000-0ff1-ce00-000000000000&scope=openid%20user.read&nonce=A81F35B8C5522A771B266137157EDEC263C8AB0BCCAC1305-85AE95DABAAD2D3FFAAF9C26F318259334268AB886728270CC87C7D0F35D91D5&redirect_uri=https:%2F%2Ffrogdesign.sharepoint.com%2F_forms%2Fdefault.aspx&wsucxt=1&cobrandid=11bd8083-87e0-41b5-bb78-0bc43c8a8e8a&client-request-id=18a3b49e-d09b-7000-de62-84f9db98c7ef

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
