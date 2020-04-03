const HttpStatus = require('http-status-codes');
const handleError = require('../helpers/error');

/**
 * @param {object} objSchema schema to validate against
 * @param {string} strProperty property to validate
 * @returns {Function} middleware function
 */
const validationMiddleware = (objSchema, strProperty) => {
  return (req, res, next) => {
    const { error } = objSchema.validate(req[strProperty]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const strError = details.map(i => i.message).join(',');
      handleError(HttpStatus.UNPROCESSABLE_ENTITY, strError, res);
    }
  };
};

module.exports = validationMiddleware;
