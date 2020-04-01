'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoList = sequelize.define(
    'TodoList',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  TodoList.associate = models => {
    // associations can be defined here
    const { Todo, User } = models;

    TodoList.hasMany(Todo, {
      // foreignKey: 'todoListId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    TodoList.belongsTo(User, {
      // foreignKey: 'userId'
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return TodoList;
};
