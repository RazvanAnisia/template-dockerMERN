const User = require('../models/user');

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
    .catch(err => res.sendStatus(403));
};
