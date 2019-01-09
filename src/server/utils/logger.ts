import pinoLogger from 'pino'

const pino = pinoLogger({
  level: 'trace'
})

const suppressLogs = process.env.SUPPRESS_LOGS

type LogFunc = (msg: string, obj?: object) => void

const generateLogger = (level: string): LogFunc => (msg: string, obj?: object) => {
  if (suppressLogs) return
  if (obj) pino[level](obj, msg)
  else pino[level](msg)
}

const logger = {
  fatal: generateLogger('fatal'),
  // tslint:disable-next-line:object-literal-sort-keys
  error: generateLogger('error'),
  warn: generateLogger('warn'),
  info: generateLogger('info'),
  debug: generateLogger('debug'),
  trace: generateLogger('trace')
}
export default logger
