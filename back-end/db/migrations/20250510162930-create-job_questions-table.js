'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable("job_questions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      question: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      required: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      index: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      audio_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      audio_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      job_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: "jobs",
          },
          key: "id",
        },
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("job_questions");
  }
};
