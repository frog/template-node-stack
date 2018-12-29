
import Router from 'koa-router';

const ping = new Router();

ping.all('/', async ctx => {
  ctx.status = 200;
  ctx.body = greeter('Albano');
});

function greeter(person: string) {
  return "Hello, " + person;  
}
export default ping;