const { Todo, TodoList, Tag } = require('../database/models');
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
 * @param {object} objUser user
 * @param {string} strTodoListName name of the todolist
 * @returns {object} new todolist object
 */
const createOne = async (objUser, strTodoListName) => {
  try {
    const objNewTodoList = await objUser.createTodoList({
      name: strTodoListName
    });
    return objNewTodoList
      ? { bSuccess: true, objNewTodoList }
      : { bSuccess: false };
  } catch (err) {
    return { bSuccess: false, err };
  }
};

/**
 * @param {string} strTodoListName name of the todolist
 * @param {string} strTodoListId todolist id
 * @returns {object|null} updated todolist object
 */
const updateOne = async (strTodoListName, strTodoListId) => {
  try {
    const objTodoList = await TodoList.findOne({
      where: { id: strTodoListId }
    });
    const objUpdatedTodolist = await objTodoList.update({
      name: strTodoListName
    });
    return objUpdatedTodolist
      ? { objUpdatedTodolist, bSuccess: true }
      : { bSuccess: false };
  } catch (err) {
    return { bSuccess: false, err: err };
  }
};

/**
 * @param {string} strTodoListId todolist id
 * @returns {object} if the query succedded or not
 */
const deleteOne = async strTodoListId => {
  try {
    const intDeletedRows = await TodoList.destroy({
      where: {
        id: strTodoListId
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
