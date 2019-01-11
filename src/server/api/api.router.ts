import login from 'api/resources/login'
import salute from 'api/resources/salute'
import Router from 'koa-router'

const api = new Router().prefix('/api/v1')

api.get('/alive', async (ctx: Router.IRouterContext) => {
  ctx.status = 200
  ctx.body = 'Alive'
})

api.get('/ready', async (ctx: Router.IRouterContext) => {
  ctx.status = 200
  ctx.body = 'Ready'
})
api.post('/login', login)
api.use('/salute', salute.routes())

export default api
