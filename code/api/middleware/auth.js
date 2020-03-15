const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader !== undefined && bearerHeader.length > 0) {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, authData) => {
      err && res.status(403).send({ message: err }) && next('invalid credentials');
      req.locals = authData.email;
      next();
    });
  } else {
    res.sendStatus(403);
  }
};
