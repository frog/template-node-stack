'use strict';
module.exports = {
	up : (queryInterface, Sequelize) => {
		return queryInterface.createTable('Notes', {
			userId : {
				primaryKey : true,
				type       : Sequelize.STRING
			},
			cardId : {
				primaryKey : true,
				type       : Sequelize.STRING
			},
			text : {
				type : Sequelize.STRING
			},
			createdAt : {
				allowNull : false,
				type      : Sequelize.DATE
			},
			updatedAt : {
				allowNull : false,
				type      : Sequelize.DATE
			}
		});
	},
	down : (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Notes');
	}
};