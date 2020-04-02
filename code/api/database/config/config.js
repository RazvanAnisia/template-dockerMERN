require('dotenv').config();

module.exports = {
  development: {
    database: process.env.DB_NAME_DEV,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    host: 'mysql-db',
    logging: true
  },
  test: {
    database: process.env.DB_NAME_TEST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    host: 'mysql-db',
    logging: true
  },
  production: {
    database: process.env.DB_NAME_PROD,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    host: 'mysql-db'
  }
};
