const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const saltRounds = 10;

exports.createUser = (req, res) => {
  const { firstName, lastName, email, password, userName } = req.body;
  bcrypt
    .hash(password, saltRounds)
    .then(hash => {
      User.create({ firstName, lastName, email, password: hash, userName })
        .then(results => {
          jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '10h' }, (err, token) => {
            res.send({ token });
          });
        })
        .catch(err => {
          res.status(400).send({ message: err.errors[0].message });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(400).send({ message: 'something went wrong, cannot create user' });
    });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: {
      email
    }
  })
    .then(({ dataValues }) => {
      const { password: strHashedPassword } = dataValues;
      if (!dataValues) {
        res.status(400).send({ message: 'wrong credentials' });
      } else {
        bcrypt
          .compare(password, strHashedPassword)
          .then(result => {
            result
              ? jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '10h' }, (err, token) => {
                  res.send({ token });
                })
              : res.status(400).send({ message: 'wrong credentials' });
          })
          .catch(err => {
            console.error(err);
          });
      }
    })
    .catch(err => {
      res.status(400).send({ message: 'wrong credentials' });
      console.log(err);
    });
};
