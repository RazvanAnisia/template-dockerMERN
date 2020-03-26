const User = require('../models/User');
const Todo = require('../models/Todo');
const TodoList = require('../models/Todolist');

/**
 *
 * @param {string} strUserEmail user email
 * @returns {object} user
 */
const findUser = async strUserEmail => {
  try {
    const objUser = await User.findOne({
      where: {
        email: strUserEmail
      }
    });

    return objUser ? { bSuccess: true, objUser } : { bSuccess: false };
  } catch (err) {
    return { bSuccess: false, err };
  }
};

exports.findUser = findUser;
