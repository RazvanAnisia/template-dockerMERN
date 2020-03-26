const Sequelize = require('sequelize').Sequelize;
const sequelize = require('../config/database');
const DataTypes = require('sequelize').DataTypes;

const Tag = sequelize.define('tag', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
    // TODO Make the name unqiue for the user
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Tag;
