const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const saltRounds = 10;
const Todo = require('../models/todo');
const Tags = require('../models/tag');

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

exports.getUserStats = (req, res) => {
  const { locals } = req;
  User.findOne({ where: { email: locals } })
    .then(user => {
      user
        .getTodoLists({
          include: Todo
        })
        .then(todolists => {
          const arrPoints = todolists.map(todolist => todolist.todos.map(todo => todo.points));
          const points = arrPoints[0].reduce((a, b) => a + b, 0);
          res.status(200).send({ data: points });
        })
        .catch(err => console.log(err));
    })
    .catch(err => res.send({ message: err }));
};

exports.updateUserDetails = (req, res) => {
  const { locals } = req;
  const { email, firstName, lastName, userName, password } = req.body;
  const objUpdatedUser = { email, firstName, lastName, userName, password };
  User.findOne({ where: { email: locals } })
    .then(user => {
      user
        .update(objUpdatedUser)
        .then(() => res.send({ message: 'Updated user details' }))
        .catch(err => res.send({ message: err }));
    })
    .catch(err => res.send({ message: err }));
};

exports.getUserDetails = (req, res) => {
  const { locals } = req;
  User.findOne({ where: { email: locals } })
    .then(user => {
      const { email, firstName, lastName, userName } = user;
      res.send({ message: 'Got user details' });
    })
    .catch(err => res.send({ message: err }));
};
