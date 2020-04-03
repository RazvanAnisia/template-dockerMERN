const { User } = require('../database/models');

/**
 *
 * @param {string} strUserEmail user email
 * @returns {object} user
 */
const find = async strUserEmail => {
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

/**
 *
 * @param {string} strUserEmail user email
 * @returns {object} user
 */
const createOne = async strUserEmail => {
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

exports.findUser = find;
