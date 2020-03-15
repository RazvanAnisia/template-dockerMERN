const Todo = require('../models/todo');
const Tag = require('../models/tag');
const TodoTag = require('../models/todoTags');
const TodoList = require('../models/todolist');

exports.getTodos = (req, res) => {
  const { user } = req.body;
  user
    .getTodos({ include: Tag })
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};

exports.createTodo = (req, res) => {
  const { title, description, dueDate, tagIds, priority, points, todolistId } = req.body;
  const objTodo = { title, description, dueDate, tagIds, priority, points, todolistId };

  TodoList.findOne({ where: { id: todolistId } }).then(todolist =>
    todolist
      .createTodo(objTodo)
      .then(todo => {
        tagIds &&
          todo
            .addTag([...tagIds])
            .then(() => res.status(200).json({ message: 'successfully added todo' }))
            .catch(err => res.status(500).send({ message: err }));
      })
      .catch(err => {
        res.status(500).send({ message: err });
        console.log(err);
      })
  );
};

exports.showTodo = (req, res) => {
  Todo.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(results => {
      results ? res.send(results) : res.send({ message: 'todo not found' });
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};

exports.updateTodo = (req, res) => {
  const { title, description, dueDate, tagIds, priority, points, todolistId } = req.body;
  const objTodo = { title, description, dueDate, tagIds, priority, points, todolistId };
  Todo.findOne({ where: { id: req.params.id } }).then(todo =>
    todo
      .update(objTodo)
      .then(todo => {
        todo
          .setTags([...tagIds])
          .then(() => res.status(200).json({ message: 'successfully added todo' }))
          .catch(err => res.status(500).send({ message: err }));
      })
      .catch(err => {
        res.status(500).send({ mesage: err });
        console.log(err);
      })
  );
};

exports.deleteTodo = (req, res) => {
  Todo.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(results => {
      results ? res.send({ message: 'Todo successfully deleted' }) : res.status(500).send({ mesage: 'Todo not found' });
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};

exports.completeTodo = (req, res) => {
  const { isCompleted } = req.body;
  const completedDate = new Date().toISOString().split('T')[0];
  const objTodoProp = { isCompleted, completedDate };
  Todo.update(objTodoProp, { where: { id: req.params.id } })
    .then(results => {
      results[0] ? res.send({ message: 'Todo successfully completed' }) : res.send({ message: 'todo not found' });
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};
