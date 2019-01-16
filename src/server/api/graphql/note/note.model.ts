import sequelize, { Model } from 'sequelize'

import { dbConnection } from 'utils/db'

const schema = {
  cardId: {
    type: sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  text: sequelize.STRING
}

const model = async (): Model => (await dbConnection()).define('Notes', schema)

export default model
