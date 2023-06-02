'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Miembros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imagen: {
        allowNull: false,
        type: Sequelize.STRING
      },
      correo: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      celular: {
        allowNull: false,
        type: Sequelize.STRING
      },
      identificacion: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      codigo: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      edad: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      direccion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      semestre_actual: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      estado: {
        allowNull: false,
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
    await queryInterface.dropTable('Miembros');
  }
};