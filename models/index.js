const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const User = require('./user');
const Genre = require('./genre');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Genre = Genre;

User.init(sequelize);
Genre.init(sequelize);

User.associate(db);
Genre.associate(db);

module.exports = db;
