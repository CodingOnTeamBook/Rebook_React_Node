const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            book_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            text: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            view_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            score: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            public: {
                type: Sequelize.BOOLEAN,
                defaultValue: 1,
            },
            tag: {
                type: Sequelize.STRING(20),
            },
        }, {
            sequelize,
            timestamp: true,
            underscored: true,
            modelName: 'Review', //모델네임. 노드프로젝트에서 사용
            tableName: 'reviews',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
        );
    }
    static associate(db) {
        db.Review.belongsToMany(db.Tag, { through: 'ReviewTag' });
        db.Review.belongsTo(db.User, { foreignkey: 'reviewer', targetkey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
        db.Review.hasMany(db.Comment, {
            foreignKey: 'what_review',
            sourceKey: 'id',
        });
    }
}