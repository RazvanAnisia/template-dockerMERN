const Todo = require('../models/todo');
const TodoList = require('../models/todolist');
const Tags = require('../models/tag');
const HttpStatus = require('http-status-codes');
const TodoListService = require('../services/todoListService');
const handleError = require('../helpers/error');

/**
 *
 * @description returns all todolist with their todos and associated tags
 * @param {object} req request
 * @param {object} res response
 * @returns {object} user Todolists
 */
const getTodoLists = async (req, res) => {
  const { user: objUser } = req;
  const arrUserTodoLists = await TodoListService.fetchTodosLists(objUser).catch(
    () =>
      handleError(
        {
          statusCodeCode: HttpStatus.BAD_REQUEST,
          message: 'Could not get todolists for user'
        },
        res
      )
  );
  return res.send(arrUserTodoLists);
};

/**
 *
 * @description creates a new todolist
 * @param {object} req request
 * @param {object} res response
 * @returns {object} new Todolist
 */
const createTodoList = async (req, res) => {
  const { name } = req.body;
  const { user: objUser } = req;
  const newTodoList = await objUser
    .createTodoList({ name })
    .catch(err => res.status().send({ message: err }));
  return res.send({
    message: 'todolist created',
    data: newTodoList
  });
};

/**
 *
 * @description updates a todolist
 * @param {object} req request
 * @param {object} res response
 * @returns {object} updates Todolist
 */
const updateTodoList = async (req, res) => {
  const { name: strName } = req.body;

  const objTodoList = await TodoList.findOne({
    where: { id: req.params.id }
  }).catch(err => res.status(500).send({ mesage: err }));

  const objUpdatedTodolist = await objTodoList
    .update({ strName })
    .catch(err => res.status(500).send({ mesage: err }));

  return res.send({ message: 'updated todolist', data: objUpdatedTodolist });
};

/**
 *
 * @description deletes a todolist
 * @param {object} req request
 * @param {object} res response
 */
const deleteTodoList = async (req, res) => {
  const { id: strTodoListId } = req.params;

  const objDeletedTodoList = await TodoList.destroy({
    where: {
      id: strTodoListId
    }
  }).catch(err => res.status(500).send({ mesage: err }));

  return res.send({
    message: 'deleted todolist',
    data: { objDeletedTodoList }
  });
};

exports.getTodoLists = getTodoLists;
exports.createTodoList = createTodoList;
exports.updateTodoList = updateTodoList;
exports.deleteTodoList = deleteTodoList;
