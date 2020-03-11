const jwt = require('jsonwebtoken');
const User = require('../models/user');

verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader !== undefined && bearerHeader.length > 0) {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, authData) => {
      err && res.status(403).end();
      User.findOne({
        where: {
          email: authData.email
        }
      })
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => res.sendStatus(403));
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  verifyToken
};
