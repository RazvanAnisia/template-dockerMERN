const Todo = require('../models/todo');
const TodoList = require('../models/todolist');

exports.getTodoLists = (req, res) => {
  const { user } = req;
  user
    .getTodoLists({ include: Todo })
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};

exports.createTodoList = (req, res) => {
  const { name } = req.body;
  const { user } = req;
  user
    .createTodoList({ name })
    .then(() => res.status(200).json({ message: 'successfully added todolist' }))
    .catch(err => {
      res.status(500).send({ message: err });
      console.log(err);
    });
};

exports.updateTodoList = (req, res) => {
  const { name } = req.body;
  TodoList.findOne({ where: { id: req.params.id } }).then(todolist =>
    todolist
      .update({ name })
      .then(() => res.status(200).json({ message: 'successfully updated todolist' }))
      .catch(err => {
        res.status(500).send({ mesage: err });
        console.log(err);
      })
  );
};

exports.deleteTodoList = (req, res) => {
  TodoList.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(results => {
      results
        ? res.send({ message: 'Todolist successfully deleted' })
        : res.status(500).send({ mesage: 'Todolist not found' });
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};
