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
      const message = details.map(i => i.message).join(',');
      console.log('error', message);
      res.status(422).json({ error: message });
    }
  };
};

module.exports = validationMiddleware;
