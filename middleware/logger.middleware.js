import logger from "../Config/winston.js";



const requestLogger = (req, res, next) => {
  const startTime = Date.now(); 

  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);

  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    logger.info(
      `Request: ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Response Time: ${responseTime}ms`
    );
  });

  next();
};

const errorLogger = (err, req, res, next) => {
  logger.error(`Error occurred in request ${req.method} ${req.originalUrl}: ${err.message}`);
 return  res.status(500).send('Internal Server Error');
};

export { requestLogger, errorLogger };
