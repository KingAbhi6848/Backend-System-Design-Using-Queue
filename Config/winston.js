import winston from 'winston';  // Corrected import syntax

const logger = winston.createLogger({
  level: 'info',  // The log level should be a string, so wrap 'info' in quotes
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level} ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

export default logger;
