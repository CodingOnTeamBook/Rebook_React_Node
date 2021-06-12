const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const Like = require('./like');
const Comment = require('./comment');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Like = Like;
db.Comment = Comment;

Like.init(sequelize);
Comment.init(sequelize);

Like.associate(db);
Comment.associate(db);

module.exports = db;
