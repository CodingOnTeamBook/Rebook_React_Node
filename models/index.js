const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const Review = require('./review');
const Tag = require('./tag');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Review = Review;
db.Tag = Tag;

Review.init(sequelize);
Tag.init(sequelize);

Review.associate(db);
Tag.associate(db);

module.exports = db;