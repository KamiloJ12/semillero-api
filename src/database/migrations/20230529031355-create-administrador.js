'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Administradors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      imagen: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      correo: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      celular: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      identificacion: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      codigo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rol: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      estado: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Administradors');
  }
};