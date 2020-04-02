'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
        // TODO Make the name unique for the user
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Tag.associate = models => {
    const { Todo, TodoTag, User } = models;

    Tag.belongsToMany(Todo, {
      through: TodoTag,
      foreignKey: 'tagId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'tags'
    });
    Tag.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Tag;
};
