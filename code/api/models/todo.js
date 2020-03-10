const Sequelize = require('sequelize').Sequelize;
const sequelize = require('../config/database');

const Todo = sequelize.define('todo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  completedDate: {
    type: Sequelize.DATEONLY,
    allowNull: true
  }
});

module.exports = Todo;
