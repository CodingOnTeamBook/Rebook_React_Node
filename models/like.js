const Sequelize = require('sequelize');

module.exports = class Like extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        count: {
          type: Sequelize.INTEGER,
          allowNull: false, //notnull
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Like',
        tableName: 'likes',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Like.belongsTo(db.User, { foreignKey: 'liker', targetKey: 'id' });
  }
};
