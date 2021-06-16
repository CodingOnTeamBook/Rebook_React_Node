const Sequelize = require('sequelize');

module.exports = class Genre extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        gen_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamp: false,
        underscored: false,
        modelName: 'Genre',
        tableName: 'genres',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Genre.belongsToMany(db.User, { through: 'UserGenre' });
  }
};
