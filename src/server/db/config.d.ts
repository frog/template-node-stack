import { Options } from 'sequelize'
declare module 'db/config' {
  const content: Options;
  export default content;
}