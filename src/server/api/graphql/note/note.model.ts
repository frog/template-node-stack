import sequelize, { Model } from 'sequelize'

import { dbConnection } from 'utils/db'

const schema = {
  uuid: {
    type: sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  text: sequelize.STRING,
  createdAt: {
    type: sequelize.DATE,
    allowNull: false
  },
  updatedAt: {
    type: sequelize.DATE,
    allowNull: false
  }
}

const model = async () => (await dbConnection()).define('Notes', schema)

export default model
