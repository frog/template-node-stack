import Koa from 'koa'

export interface IPayload {
  status: number
  body: string
}

export interface IHeaders {
  [keys: string]: string
}

export const fetchResolve = (ctx: Koa.Context, result: IPayload) => {
  const { status, body } = result
  ctx.status = status
  ctx.body = body
}

export const fetchReject = (ctx: Koa.Context, err: { response?: IPayload, message: string }) => {
  const { response } = err
  if (response) {
    const { status, body } = response
    ctx.status = status
    ctx.body = body
  } else {
    ctx.throw(err.message)
  }
}

export const fetchOptions = (
  params: {
    body?: string;
    compress?: boolean;
    headers?: IHeaders;
    method?: string;
  } = {}
) => {
  const { method = 'GET', compress = true, body, headers: reqHeaders } = params

  const options = {
    body,
    compress,
    headers: reqHeaders || {},
    method
  }

  if (typeof body === 'object') {
    options.headers['content-type'] = 'application/json'
    options.body = JSON.stringify(body)
  }

  return options
}
