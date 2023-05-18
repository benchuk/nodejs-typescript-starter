import winston from 'winston'
import config from '../config/env'

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

function level() {
    return config.isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'gray'
}

winston.addColors(colors)

function getIcon(level: string) {
    if (level.includes('debug')) return "🐞"
    if (level.includes('warn')) return "😨"
    if (level.includes('error')) return "❌"
    return "👉"
}
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.simple(),
    winston.format.printf(
        (info: { timestamp: any; level: string; message: any; }) => `${info.timestamp} ${getIcon(info.level)} ${info.level}: ${info.message}`,
    )
)

const transports = [
    new winston.transports.Console(),
    //   new winston.transports.File({
    //     filename: 'logs/error.log',
    //     level: 'error',
    //   }),
    //   new winston.transports.File({ filename: 'logs/all.log' }),
]

const loggerService = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})

process.on('uncaughtException', (err) => {
    console.trace(err)
    loggerService.error('uncaught exception: ', err)
})
process.on('unhandledRejection', (reason, p) => {
    console.trace(reason)
    loggerService.error('unhandled rejection: ', reason, p)
    loggerService.error('unhandled rejection: ', p)
})

loggerService.warn("==============+===============")
loggerService.warn(config.description)
loggerService.warn("==============-==============")

class EvsLogger {
    async log(msg: string) {
        loggerService.info(msg)
    }
    async info(msg: string) {
        loggerService.info(msg)
    }
    async debug(msg: string) {
        loggerService.debug(msg)
    }
    async error(msg: string) {
        loggerService.error(msg)
    }
    async warn(msg: string) {
        loggerService.warn(msg)
    }
    async http(msg: string) {
        loggerService.http(msg)
    }
}
// 👇️ default export
export default new EvsLogger();
