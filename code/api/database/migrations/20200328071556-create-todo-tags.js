'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TodoTags', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        allowNull: false
      },
      todoId: {
        type: Sequelize.UUID,
        references: {
          model: 'Todos', // name of Target model
          key: 'id' // key in Target model that we're referencing
        }
      },
      tagId: {
        type: Sequelize.UUID,
        references: {
          model: 'Tags', // name of Target model
          key: 'id' // key in Target model that we're referencing
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TodoTags');
  }
};
