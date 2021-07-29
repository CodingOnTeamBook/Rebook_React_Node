import * as winston from 'winston';
import * as dotenv from 'dotenv';
const { combine, timestamp, printf } = winston.format;

dotenv.config();

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),
  transports: [
    //info
    new winston.transports.File({
      level: 'info',
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 7,
      filename: './logs/combined.log',
    }),
  ],
});

if (process.env.NODE_ENV === 'dev') {
  logger.add(
    new winston.transports.Console({
      format: combine(winston.format.colorize(), winston.format.simple()),
    })
  );
}
