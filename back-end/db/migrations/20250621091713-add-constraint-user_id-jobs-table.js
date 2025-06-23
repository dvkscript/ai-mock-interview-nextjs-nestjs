'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addConstraint('jobs', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_jobs_user_id',
      references: {
        table: 'users', // bảng tham chiếu
        field: 'id', // cột tham chiếu
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.removeConstraint('jobs', 'fk_jobs_user_id');
  },
};
