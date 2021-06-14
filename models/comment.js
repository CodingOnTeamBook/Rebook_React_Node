const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        text: {
          type: Sequelize.STRING(255),
          allowNull: false, //notnull
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, {
      foreignKey: 'commenter',
      targetKey: 'id',
    });
    db.Comment.belongsTo(db.Review, {
      foreignKey: 'what_review',
      targetKey: 'id',
    });
  }
};
