import Router from 'koa-router';

const ping = new Router();

ping.all('/', async ctx => {
  ctx.status = 200;
  ctx.body = 'asd';
});
export default ping;
