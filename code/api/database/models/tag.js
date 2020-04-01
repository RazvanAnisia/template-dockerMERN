'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
        // TODO Make the name unqiue for the user
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
      foreignKey: 'tagId'
    });
    Tag.belongsTo(User, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Tag;
};
