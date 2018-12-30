import Router from 'koa-router'

const ping = new Router()

ping.all('/', async (ctx: Router.IRouterContext) => {
    ctx.status = 200
    ctx.body = 'asd'
})

export default ping
