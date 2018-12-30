import ping from 'api/resources/ping'
import salute from 'api/resources/salute'
import Router from 'koa-router'

const api = new Router()

api.use('/api/ping', ping.routes())
api.use('/api/salute', salute.routes())

export default api
