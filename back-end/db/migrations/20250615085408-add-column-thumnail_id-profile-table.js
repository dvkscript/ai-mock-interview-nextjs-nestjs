'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await  queryInterface.addColumn('user_profiles', 'thumbnail_id', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.removeColumn('user_profiles', 'thumbnail_id')
  }
};
