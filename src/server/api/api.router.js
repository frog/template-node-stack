import Router from 'koa-router';
import ping from './resources/ping';
import salute from './resources/salute';

const api = new Router();

api.use('/api/ping', ping.routes());
api.use('/api/salute', salute.routes());

export default api;
