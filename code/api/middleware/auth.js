const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const handleError = require('../helpers/error');

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader !== undefined && bearerHeader.length > 0) {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, authData) => {
      err &&
        handleError(
          {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'Forbidden'
          },
          res
        ) &&
        next('invalid credentials');
      req.locals = authData.email;
      next();
    });
  } else {
    handleError(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Forbidden'
      },
      res
    );
  }
};
