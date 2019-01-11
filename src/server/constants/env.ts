import logger from 'utils/logger'

export enum Environment {
  dev = 'dev',
  local = 'local',
  test = 'test',
  production = 'production'
}

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
} = {
  NODE_ENV: Environment[getConstValue('NODE_ENV', 'dev') as keyof typeof Environment] || Environment.dev,
  PORT: getConstValue('PORT', 3337) as number,
  JWT_TOKEN_KEY: getConstValue('JWT_TOKEN_KEY', 'f0c4cc1n4') as string,
  JWT_TOKEN_EXPIRE: getConstValue('JWT_TOKEN_EXPIRE', SECONDS_IN_DAY * 30) as number
}

export default env
