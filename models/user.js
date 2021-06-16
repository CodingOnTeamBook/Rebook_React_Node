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
        ID: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        birth: {
          type: Sequelize.DATEONLY,
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
        snsId: {
          type: Sequelize.STRING(10),
          allowNull: true,
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
    db.User.belongsToMany(db.Like, { through: 'UserLike' });
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
