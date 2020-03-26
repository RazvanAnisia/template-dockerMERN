const HttpStatus = require('http-status-codes');
const TodoListService = require('../services/todoListService');
const handleError = require('../helpers/error');

/**
 *
 * @description returns all todolist with their todos and associated tags
 * @param {object} req request
 * @param {object} res response
 */
const getTodoLists = async (req, res) => {
  const { user: objUser } = req;
  try {
    const { bSuccess, body, err } = await TodoListService.fetchAll(objUser);
    if (bSuccess) return res.send(body);
    handleError(HttpStatus.BAD_REQUEST, 'Could not get todolists', res, err);
  } catch (err) {
    handleError(HttpStatus.BAD_REQUEST, 'Could not get todolists', res, err);
  }
};

/**
 *
 * @description creates a new todolist
 * @param {object} req request
 * @param {object} res response
 */
const createTodoList = async (req, res) => {
  // TODO add validation for name
  const { name: strTodoListName } = req.body;
  const { user: objUser } = req;
  try {
    const { bSuccess, body, err } = await TodoListService.createOne(
      objUser,
      strTodoListName
    );
    if (bSuccess)
      return res.send({
        message: 'Created todolist',
        data: body
      });
    handleError(HttpStatus.CONFLICT, 'Failed to create todolist', res, err);
  } catch (err) {
    handleError(HttpStatus.CONFLICT, 'Failed to create todolist', res, err);
  }
};

/**
 *
 * @description updates a todolist
 * @param {object} req request
 * @param {object} res response
 */
const updateTodoList = async (req, res) => {
  // TODO add validation for name
  const { name: strTodoListName } = req.body;
  const { id: strTodoListId } = req.params;

  try {
    const { bSuccess, err } = await TodoListService.updateOne(
      strTodoListName,
      strTodoListId
    );
    if (bSuccess)
      return res.send({
        message: 'Updated todolist',
        data: { id: strTodoListId }
      });
    handleError(HttpStatus.BAD_REQUEST, 'Failed to update todolist', res, err);
  } catch (err) {
    handleError(HttpStatus.BAD_REQUEST, 'Failed to update todolist', res, err);
  }
};

/**
 *
 * @description deletes a todolist
 * @param {object} req request
 * @param {object} res response
 */
const deleteTodoList = async (req, res) => {
  const { id: strTodoListId } = req.params;

  try {
    const { bSuccess, err } = await TodoListService.deleteOne(strTodoListId);
    if (bSuccess)
      return res.send({
        message: 'Deleted todolist',
        data: { id: strTodoListId }
      });
    handleError(HttpStatus.BAD_REQUEST, 'Failed to delete todolist', res, err);
  } catch (err) {
    handleError(HttpStatus.BAD_REQUEST, 'Failed to delete todolist', res, err);
  }
};

exports.getTodoLists = getTodoLists;
exports.createTodoList = createTodoList;
exports.updateTodoList = updateTodoList;
exports.deleteTodoList = deleteTodoList;
