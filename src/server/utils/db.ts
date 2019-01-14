// import env from 'constants/env'
// import sequelize, { Sequelize } from 'sequelize'
// import logger from 'utils/logger'

// let connection: Sequelize

// export const initDBConnection = async () => {
//   if (process.env.NODE_ENV === 'test') {
//     return Promise.resolve()
//   }

//   if (connection) {
//     return Promise.resolve(connection)
//   }

//   const dbConnectionString = `postgres://${env.MYAXA_DATABASE_USERNAME}:${
//     env.MYAXA_DATABASE_PASSWORD
//     }@${env.MYAXA_DATABASE_HOST}:${env.MYAXA_DATABASE_PORT}/${
//     env.MYAXA_DATABASE_NAME
//     }`

//   const dialect = env.MYAXA_DATABASE_DIALECT
//   const operatorsAliases = sequelize.Op

//   const { Sequelize } = sequelize
//   const instance = new Sequelize(dbConnectionString, {
//     dialect,
//     operatorsAliases,
//     logging: false
//   })

//   try {
//     await instance.authenticate()
//     logger.info(
//       `Connected succesfully to the database with dialect ${dialect}`
//     )
//     connection = instance
//     return Promise.resolve(connection)
//   } catch (err) {
//     logger.error(err)
//     return Promise.reject()
//   }
// }

// export const dbConnection = () => connection
