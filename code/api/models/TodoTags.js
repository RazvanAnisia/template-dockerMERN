const sequelize = require('../config/database');
const DataTypes = require('sequelize').DataTypes;

const TodoTag = sequelize.define('todo_tags', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    allowNull: false
  }
});

module.exports = TodoTag;
