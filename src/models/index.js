const Sequelize = require('sequelize');
const sequelizeHelper = require('./../utils/sequelizeHelper');

const Collection = sequelizeHelper.define('collection', {
  // 属性
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  uri: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  artist: {
    type: Sequelize.STRING
  },
  settle: {
    type: Sequelize.STRING
  },
  difficulty: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  source: Sequelize.STRING,
  bucket: Sequelize.STRING,
  locations: Sequelize.TEXT,
});
sequelizeHelper.sync({ force: false });
exports.Collection = Collection