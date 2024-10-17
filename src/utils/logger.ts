import winston from 'winston';

const logDir = '../../logs';

//Create a logger instance with different log levels
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            )
        }
        ),
        new winston.transports.File({ filename: `${logDir}/error.log`, level: 'error' }),
        new winston.transports.File({ filename: `${logDir}/combined.log` }),
    ],
});

if (process.env.NODE_ENV === 'development') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        ),
    }));
}

export default logger;