import logger from 'utils/logger'

export enum Environment {
  dev = 'dev',
  local = 'local',
  test = 'test',
  production = 'production'
}
/**
 * Getting a value from application env, or a default - TS version
 * @param constKey key to lookup in environment variables
 * @param value default value if not specifeid
 * @param value default value if not specifeid
 * @param secret  if the value is security-sensible (passwords) will mask any logging
 *
 * @returns {string} the value of the environment variable
 */
const getConstValue = (constKey: string, value: string | number, secret = false): string | number => {
  let constValue = value
  const fromOS: string | undefined = process.env[constKey]
  if (fromOS) {
    // constValue is now of type string
    constValue = fromOS
    logger.info(`${constKey}: using ${secret === true ? '****' : constValue}`)
    if (typeof value === 'number') {
      constValue = parseInt(constValue, 10)
    }
  }
  return constValue
}

const SECONDS_IN_DAY = 86400
const env: {
  NODE_ENV: Environment;
  PORT: number;
  JWT_TOKEN_KEY: string;
  JWT_TOKEN_EXPIRE: number;
  DB_HOST: string;
  DB_PORT: number;
  DATABASE_URL: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
} = {
  NODE_ENV: Environment[getConstValue('NODE_ENV', 'dev') as keyof typeof Environment] || Environment.dev,
  PORT: getConstValue('PORT', 3337) as number,
  JWT_TOKEN_KEY: getConstValue('JWT_TOKEN_KEY', 'f0c4cc1n4') as string,
  JWT_TOKEN_EXPIRE: getConstValue('JWT_TOKEN_EXPIRE', SECONDS_IN_DAY * 30) as number,
  DB_HOST: getConstValue('DB_HOST', 'localhost') as string,
  DB_PORT: getConstValue('DB_PORT', 5432) as number,
  DATABASE_URL: getConstValue('DATABASE_URL', 'sqlite://') as string,
  DB_NAME: getConstValue('DB_NAME', 'multiplatform-pokedex') as string,
  DB_USER: getConstValue('DB_USER', 'root') as string,
  DB_PASSWORD: getConstValue('DB_PASSWORD', 'pika') as string
}
export default env
