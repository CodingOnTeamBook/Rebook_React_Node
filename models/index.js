const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const User = require('./user');
const Genre = require('./genre');
const Review = require('./review');
const Tag = require('./tag');
const Like = require('./like');
const Comment = require('./comment');
const Devuser = require('./devuser');

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
db.Review = Review;
db.Tag = Tag;
db.Like = Like;
db.Comment = Comment;
db.Devuser = Devuser;

User.init(sequelize);
Genre.init(sequelize);
Review.init(sequelize);
Tag.init(sequelize);
Like.init(sequelize);
Comment.init(sequelize);
Devuser.init(sequelize);

User.associate(db);
Genre.associate(db);
Review.associate(db);
Tag.associate(db);
Like.associate(db);
Comment.associate(db);
Devuser.associate(db);

module.exports = db;
