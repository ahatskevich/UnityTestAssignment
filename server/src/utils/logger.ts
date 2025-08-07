import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import { loggerConfig, formatConfig, fileOptions } from '../config/logger';

winston.addColors(loggerConfig.colors);

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    levels: loggerConfig.levels,
    format: formatConfig.default,
    transports: [
        new winston.transports.DailyRotateFile({
            ...fileOptions,
            level: 'error',
            filename: path.join(__dirname, '../../logs/error/%DATE%-error.log'),
        }),
        new winston.transports.DailyRotateFile({
            ...fileOptions,
            filename: path.join(__dirname, '../../logs/combined/%DATE%-combined.log'),
        }),
        new winston.transports.DailyRotateFile({
            ...fileOptions,
            filename: path.join(__dirname, '../../logs/http/%DATE%-http.log'),
            level: 'http',
            format: winston.format.combine(
                winston.format((info) => info.level === 'http' ? info : false)(),
                formatConfig.default
            )
        }),

    ],
    exceptionHandlers: [
        new winston.transports.DailyRotateFile({
            ...fileOptions,
            filename: path.join(__dirname, '../../logs/error/%DATE%-exceptions.log'),
        }),
    ],
    rejectionHandlers: [
        new winston.transports.DailyRotateFile({
            ...fileOptions,
            filename: path.join(__dirname, '../../logs/error/%DATE%-rejections.log'),
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: formatConfig.console,
        })
    );
}

export default logger;