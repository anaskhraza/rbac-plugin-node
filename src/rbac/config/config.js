require('dotenv').config();


module.exports = {

  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: 'rbac', //process.env.DB_NAME,
    username: 'postgres', //process.env.DB_USER,
    password: 'postgres', //process.env.DB_PASS,
    host: 'localhost', //process.env.DB_HOST,
    dialect: 'postgres'
  },

  test: {
    database: process.env.TEST_DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};
