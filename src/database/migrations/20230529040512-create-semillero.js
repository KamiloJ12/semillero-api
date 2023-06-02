'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Semilleros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mision: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      vision: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      facebook: {
        type: Sequelize.STRING
      },
      youtube: {
        type: Sequelize.STRING
      },
      gmail: {
        type: Sequelize.STRING
      },
      twitter: {
        type: Sequelize.STRING
      },
      github: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Semilleros');
  }
};