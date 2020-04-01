require('dotenv').config();
const Sequelize = require('sequelize').Sequelize;

// TODO follow these tutorials https://www.oriechinedu.com/posts/getting-started-with-sequelize-and-postgres https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
const sequelize = new Sequelize(
  process.env.DB_NAME_DEV,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: 'mysql-db',
    logging: false
  }
);

module.exports = sequelize;
