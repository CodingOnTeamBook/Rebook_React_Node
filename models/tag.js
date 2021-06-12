const Sequelize = require('sequelize');

module.exports = class Tag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        },
            {
                sequelize,
                timestamp: true,
                underscored: true,
                modelName: 'Tag', //모델네임. 노드프로젝트에서 사용
                tableName: 'tags',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }
    static associate(db) {
        db.Tag.belongsToMany(db.Review, { through: 'ReviewTag' });
    }
}