const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        nickname: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        gender: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        age_range: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        user_img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: 'local',
        },
        userId: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamp: true,
        underscored: true,
        modelName: 'User', //모델네임. 노드프로젝트에서 사용
        tableName: 'users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.User.belongsToMany(db.Genre, { through: 'UserGenre' });
    db.User.hasMany(db.Review, { foreignKey: 'reviewer', sourceKey: 'id' });
    db.User.hasMany(db.Like, { foreignKey: 'liker', sourceKey: 'id' });
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};
