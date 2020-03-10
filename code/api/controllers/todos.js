const Todo = require('../models/todo');

exports.getTodos = (req, res) => {
  Todo.findAll()
    .then(({ dataValues }) => {
      res.send(dataValues);
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};

exports.createTodo = (req, res) => {
  const { todoDescription, createdAt, dueDate, todolistId } = req.body;
  Todo.create({ todoDescription, createdAt, dueDate, todolistId })
    .then(() => res.status(200).json({ message: 'successfully added todo' }))
    .catch(err => {
      res.status(500).send({ message: err });
      console.log(err);
    });
};

exports.showTodo = (req, res) => {
  Todo.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(({ dataValues }) => {
      !rows && res.status(500).send({ message: 'todo does not exist' });
      res.send(dataValues);
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};

exports.updateTodo = (req, res) => {
  const { isCompleted, title, description, dueDate } = req.body;
  const objTodoProp = { isCompleted, title, description, dueDate };
  Todo.update(objTodoProp, { where: { id: req.params.id } })
    .then(([rowsUpdate, [updatedValue]]) => {
      res.send({ message: 'Todo successfully updated', payload: rowsUpdate });
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};

exports.deleteTodo = (req, res) => {
  Todo.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.send({ message: 'Todo successfully deleted' });
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};
