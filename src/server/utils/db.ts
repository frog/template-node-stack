import env from 'constants/env'
import config from 'db/config'
import sequelize, { Sequelize } from 'sequelize'
import logger from 'utils/logger'

let connection: Sequelize

export const dbConnection = async (): Promise<Sequelize> => {

  if (connection) {
    return Promise.resolve(connection)
  }

  const instance = new sequelize(config)

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
