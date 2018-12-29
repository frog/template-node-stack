import logger from 'utils/logger'

export enum Environment {
    Dev = 'dev',
    Local = 'local',
    Test = 'test',
    Production = 'production'
}

const getConstValue = (constKey: string, value: string, secret = false): string => {
    let constValue = value
    const fromOS = process.env[constKey]
    if (fromOS) constValue = fromOS
    logger.info(`${constKey}: using ${secret === true ? '****' : constValue}`)
    return constValue
}

const env: {
    NODE_ENV: Environment;
    PORT: number;
} = {
    NODE_ENV: Environment[getConstValue('NODE_ENV', 'dev') as keyof typeof Environment] || Environment.Dev,
    PORT: parseInt(getConstValue('PORT', '3337'), 10)
}

export default env
