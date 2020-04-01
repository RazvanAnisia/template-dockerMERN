'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'Todolists', // name of Source model
        'userId', // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: 'Users', // name of Target model
            key: 'id' // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      )
      .then(() =>
        queryInterface.addColumn(
          'Tags', // name of Source model
          'userId', // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: 'Users', // name of Target model
              key: 'id' // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        )
      )
      .then(() =>
        queryInterface.addColumn(
          'Todos', // name of Source model
          'todoListId', // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: 'Todolists', // name of Target model
              key: 'id' // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        )
      )
      .then(() =>
        queryInterface.addColumn(
          'TodoTags', // name of Source model
          'todoId', // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: 'Todos', // name of Target model
              key: 'id' // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        )
      )
      .then(() =>
        queryInterface.addColumn(
          'TodoTags', // name of Source model
          'tagId', // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: 'Tags', // name of Target model
              key: 'id' // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        )
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TodoTags');
  }
};
