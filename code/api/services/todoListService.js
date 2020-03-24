const Todo = require('../models/todo');
const TodoList = require('../models/todolist');
const Tags = require('../models/tag');

/**
 *
 * @param {object} objUser user
 * @returns {Array} array of todolists corresponding to the user
 */
const fetchTodosLists = async objUser => {
  const arrUserTodoLists = await objUser.getTodoLists({
    include: [
      {
        model: Todo,
        include: [Tags]
      }
    ]
  });
  return arrUserTodoLists;
};

exports.fetchTodosLists = fetchTodosLists;
