const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
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
        }
      },
      {
        sequelize,
        timestamp: true,
        underscored: false,
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
  }
};
