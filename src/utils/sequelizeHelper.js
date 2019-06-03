const Sequelize = require('sequelize');
const configs = require('../../conf').mysql;
const sequelize = new Sequelize(configs.database, configs.user, configs.password, {
  host: configs.host,
  port: configs.port,
  dialect: 'mysql',
  operatorsAliases: false,
  'define': {
    'underscored': true,
    'charset': 'utf8mb4'
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = sequelize;