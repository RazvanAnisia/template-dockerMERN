const winston = require('winston');
const expressWinston = require('express-winston');

const logger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg:
    'HTTP {{res.statusCode}} \n {{req.method}} \n {{res.responseTime}}ms \n {{req.url}}',
  expressFormat: true,
  colorize: true,
  ignoreRoute: (req, res) => {
    return false;
  }
});

module.exports = logger;
