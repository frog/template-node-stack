import { OperatorsAliases } from 'sequelize'
import { SequelizeConfig } from 'sequelize-typescript/lib/types/SequelizeConfig'
declare module 'db/config' {
  const content: SequelizeConfig;
  export default content;
}