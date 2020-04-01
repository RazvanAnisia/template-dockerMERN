'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoTags = sequelize.define(
    'TodoTag',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false
      }
    },
    {}
  );
  TodoTags.associate = models => {
    // associations can be defined here
  };
  return TodoTags;
};
