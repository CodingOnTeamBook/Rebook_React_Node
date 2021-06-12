const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            book_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            text: {
                type: Sequelize.STRING(20),
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
                defaultValue: 0,
            },
            tag: {
                type: Sequelize.STRING(20),
            },
        }, {
            sequelize,
            timestamp: true,
            underscored: false,
            modelName: 'Review', //모델네임. 노드프로젝트에서 사용
            tableName: 'reviews',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
        );
    }
}