'use strict';

module.exports = {
	up : (queryInterface, Sequelize) => {
		const value = {
			id        : 2,
			cardId    : 'xy7-54',
			text      : 'This is a great card Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit.',
			createdAt : Date(),
			updatedAt : Date()
		};
		return queryInterface.bulkInsert('Notes', [value], {});
	},

	down : (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Notes', { cardId : 'xy7-54' });
	}
};
