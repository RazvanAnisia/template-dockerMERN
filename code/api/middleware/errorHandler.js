const { handleError } = require('../helpers/error');

/**
 *
 * @param {object} err error
 * @param {object} req request
 * @param {object} res response
 * @param {object} next next
 */
const errorHandler = (err, req, res, next) => {
  handleError(err, res);
  console.log('error middleware');
};

module.exports = errorHandler;
