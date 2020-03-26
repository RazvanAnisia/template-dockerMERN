const Todo = require('../models/Todo');
const TodoList = require('../models/Todolist');
const Tag = require('../models/Tag');
/**
 *
 * @param {object} objUser user
 * @returns {Array} array of todolists corresponding to the user
 */
const fetchAll = async objUser => {
  try {
    const arrTodoLists = await objUser.getTodoLists({
      include: [
        {
          model: Todo,
          include: [Tag]
        }
      ]
    });
    return arrTodoLists
      ? { bSuccess: true, arrTodoLists }
      : { bSuccess: false };
  } catch (err) {
    return { bSuccess: false, err };
  }
};

/**
 * @param {string} strTodoListId todolist id
 * @param {object} objTodoParams all the fields the new todo needs
 * @returns {object} new todo object
 */
const createOne = async (strTodoListId, objTodoParams) => {
  const { tagIds: arrTagIds } = objTodoParams;
  try {
    const objTodoList = await TodoList.findOne({
      where: { id: strTodoListId }
    });
    const objNewTodo = await objTodoList.createTodo(objTodoParams);
    if (arrTagIds) {
      const objAddedTags = await objNewTodo.addTag([...arrTagIds]);
      return objAddedTags
        ? { bSuccess: true, objNewTodo }
        : { bSuccess: false };
    }
    return objNewTodo ? { bSuccess: true, objNewTodo } : { bSuccess: false };
  } catch (err) {
    return { bSuccess: false, err };
  }
};

/**
 * @param {string} strTodoId todo id
 * @returns {object|null} updated todo object
 */
const showOne = async strTodoId => {
  try {
    const objTodo = await Todo.findOne({
      where: { id: strTodoId },
      include: [Tag]
    });
    return objTodo ? { objTodo, bSuccess: true } : { bSuccess: false };
  } catch (err) {
    return { bSuccess: false, err: err };
  }
};

/**
 * @param {string} strTodoId todo id
 * @param {object} objTodoParams all the fields the new todo needs
 * @returns {object} updated todo object
 */
const updateOne = async (strTodoId, objTodoParams) => {
  const { tagIds: arrTagIds } = objTodoParams;
  try {
    const objTodo = await Todo.findOne({
      where: { id: strTodoId }
    });
    const objUpdatedTodo = await objTodo.update(objTodoParams);
    if (arrTagIds) {
      const objAddedTags = await objUpdatedTodo.setTags([...arrTagIds]);
      return objAddedTags
        ? { bSuccess: true, objUpdatedTodo }
        : { bSuccess: false };
    }
    return objUpdatedTodo
      ? { bSuccess: true, objUpdatedTodo }
      : { bSuccess: false };
  } catch (err) {
    return { bSuccess: false, err };
  }
};

/**
 * @param {string} strTodoId todo id
 * @returns {object} if the query succedded or not
 */
const deleteOne = async strTodoId => {
  try {
    const intDeletedRows = await Todo.destroy({
      where: {
        id: strTodoId
      }
    });
    return intDeletedRows === 0 ? { bSuccess: false } : { bSuccess: true };
  } catch (err) {
    return { bSuccess: false, err };
  }
};

exports.fetchAll = fetchAll;
exports.createOne = createOne;
exports.updateOne = updateOne;
exports.deleteOne = deleteOne;
exports.showOne = showOne;
