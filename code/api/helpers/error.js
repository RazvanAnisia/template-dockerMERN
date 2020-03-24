/**
 *
 * @param {object} err express error
 * @param {object} res express response
 * @returns {object} response
 */
const handleError = (err, res) => {
  const { statusCode, message } = err;
  return res.status(statusCode).send({
    status: 'error',
    statusCode,
    message
  });
};

module.exports = handleError;
