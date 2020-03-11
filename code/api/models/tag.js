const Sequelize = require('sequelize').Sequelize;
const sequelize = require('../config/database');

const Tag = sequelize.define('tag', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Tag;
