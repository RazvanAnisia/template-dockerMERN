const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var newData = [];

    for (let i = 0; i < 10; i++) {
      const seedData = {
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert('Users', newData, {});
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {})
};
