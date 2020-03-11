const Sequelize = require('sequelize').Sequelize;
const sequelize = require('../config/database');

const Tag = sequelize.define('todo_tags', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});

module.exports = Tag;
