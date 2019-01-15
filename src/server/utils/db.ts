import env from 'constants/env'
import config from 'db/config'
import { Sequelize } from 'sequelize-typescript'
import logger from 'utils/logger'

let connection: Sequelize

export const initDBConnection = async () => {
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve()
  }

  if (connection) {
    return Promise.resolve(connection)
  }

  const instance = new Sequelize(config)

  try {
    await instance.authenticate()
    logger.info(`Connected succesfully to the database with dialect ${config.dialect}`)
    connection = instance
    return Promise.resolve(connection)
  } catch (err) {
    logger.error(err)
    return Promise.reject()
  }
}

export const dbConnection = async () => {
  await initDBConnection()
  return connection
}
