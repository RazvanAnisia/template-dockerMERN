const Todo = require('../models/Todo');
const TodoList = require('../models/Todolist');
const HttpStatus = require('http-status-codes');
const handleError = require('../helpers/error');
const TodoService = require('../services/todoService');

/**
 *
 * @description create todo
 * @param {object} req request
 * @param {object} res response
 */
const createTodo = async (req, res) => {
  const {
    title: strTitle,
    description: strDescription,
    dueDate: strDueDate,
    tagIds: arrTagIds,
    priority: strPriority,
    points: intPoints,
    todoListId: strTodoListId
  } = req.body;

  const objTodo = {
    title: strTitle,
    description: strDescription,
    dueDate: strDueDate,
    tagIds: arrTagIds,
    priority: strPriority,
    points: intPoints,
    todolistId: strTodoListId
  };

  try {
    const { objNewTodo, bSuccess, err } = await TodoService.createOne(
      strTodoListId,
      objTodo
    );

    if (bSuccess)
      return res.send({
        message: 'Created todo',
        data: objNewTodo
      });
    handleError(HttpStatus.CONFLICT, 'Failed to create todolist', res, err);
  } catch (err) {
    handleError(HttpStatus.CONFLICT, 'Failed to create todolist', res, err);
  }
};

/**
 *
 * @description show todo
 * @param {object} req request
 * @param {object} res response
 */
const showTodo = async (req, res) => {
  const { id: strTodoId } = req.params;
  try {
    const { objTodo, bSuccess, err } = await TodoService.showOne(strTodoId);

    if (bSuccess) return res.send(objTodo);
    handleError(HttpStatus.NOT_FOUND, 'Failed to get todo', res, err);
  } catch (err) {
    handleError(HttpStatus.NOT_FOUND, 'Failed to get todo', res, err);
  }
};

/**
 *
 * @description update todo
 * @param {object} req request
 * @param {object} res response
 */
const updateTodo = async (req, res) => {
  const { id: strTodoId } = req.params;

  const {
    title: strTitle,
    description: strDescription,
    dueDate: strDueDate,
    tagIds: arrTagIds,
    priority: strPriority,
    points: intPoints,
    todoListId: strTodoListId
  } = req.body;

  const objTodoParams = {
    title: strTitle,
    description: strDescription,
    dueDate: strDueDate,
    tagIds: arrTagIds,
    priority: strPriority,
    points: intPoints,
    todolistId: strTodoListId
  };

  try {
    const { objUpdatedTodo, bSuccess, err } = await TodoService.updateOne(
      strTodoId,
      objTodoParams
    );

    if (bSuccess)
      return res.send({
        message: 'Updated todo',
        data: objUpdatedTodo
      });
    handleError(HttpStatus.CONFLICT, 'Failed to update todo', res, err);
  } catch (err) {
    handleError(HttpStatus.CONFLICT, 'Failed to update todo', res, err);
  }
};

/**
 *
 * @description delete todo
 * @param {object} req request
 * @param {object} res response
 */
const deleteTodo = async (req, res) => {
  const { id: strTodoId } = req.params;

  try {
    const { bSuccess, err } = await TodoService.deleteOne(strTodoId);
    if (bSuccess)
      return res.send({
        message: 'Deleted todo',
        data: { id: strTodoId }
      });
    handleError(HttpStatus.BAD_REQUEST, 'Failed to delete todo', res, err);
  } catch (err) {
    handleError(HttpStatus.BAD_REQUEST, 'Failed to delete todo', res, err);
  }
};

// TODO figure out if update is enough and can remove this
exports.completeTodo = (req, res) => {
  const { isCompleted } = req.body;
  const completedDate = new Date().toISOString().split('T')[0];
  const objTodoProp = { isCompleted, completedDate };
  Todo.update(objTodoProp, { where: { id: req.params.id } })
    .then(results => {
      results[0]
        ? res.send({ message: 'Todo successfully completed' })
        : res.send({ message: 'todo not found' });
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};

exports.createTodo = createTodo;
exports.showTodo = showTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
