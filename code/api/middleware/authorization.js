const User = require('../models/user');
const HttpStatus = require('http-status-codes');
const handleError = require('../helpers/error');

exports.verifyUser = (req, res, next) => {
  const { locals } = req;
  User.findOne({
    where: {
      email: locals
    }
  })
    .then(user => {
      req.user = user;
      next();
    })
    .catch(() =>
      handleError(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Forbidden'
        },
        res
      )
    );
};
