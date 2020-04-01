'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Todos', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
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
      // TODO add validation or constraint that i cannot be in the past
      dueDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      completedDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      priority: {
        type: Sequelize.ENUM(['low', 'medium', 'high']),
        allowNull: false,
        defaultValue: 'low'
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      todoListId: {
        type: Sequelize.UUID,
        references: {
          model: 'TodoLists', // name of Target model
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
    return queryInterface.dropTable('Todos');
  }
};
