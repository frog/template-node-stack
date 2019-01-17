import env from 'constants/env'
import { sign } from 'jsonwebtoken'
import Router from 'koa-router'
import logger from 'utils/logger'

const users: { [index: string]: {} } = {
  'ifrog.design.mi@gmail.com|f0c4cc1n4': {
    email: 'ifrog.design.mi@gmail.com',
    name: 'Carlo',
    surname: 'Verdi'
  },
  'franco.nero@gmail.com|f0c4cc1n4': {
    email: 'franco.nero@gmail.com',
    name: 'Franco',
    surname: 'Nero'
  }
}

const login = async (ctx: Router.IRouterContext) => {
  const tag = 'rest::login'
  const { username, password } = ctx.request.body
  logger.info(`${tag} - ${username}:****`)
  const user = users[`${username}|${password}`]
  if (user) {
    ctx.status = 200
    const token = sign(user, env.JWT_TOKEN_KEY, {
      expiresIn: env.JWT_TOKEN_EXPIRE
    })
    ctx.set('X-JWT-Access-Token', token)
    ctx.cookies.set('X-Auth-JWT', token)
    ctx.body = {
      user,
      access_token: token,
      expiresIn: env.JWT_TOKEN_EXPIRE
    }
  } else {
    ctx.status = 401
    ctx.body = {
      status: 401,
      error: 'Cannot authenticate'
    }
  }
}
export default login
