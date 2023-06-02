'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imagen: {
        allowNull: false,
        type: Sequelize.STRING
      },
      descripcion: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      fecha_inicio: {
        allowNull: false,
        type: Sequelize.DATE
      },
      fecha_fin: {
        allowNull: false,
        type: Sequelize.DATE
      },
      fecha_inicio_inscripcion: {
        allowNull: false,
        type: Sequelize.DATE
      },
      fecha_fin_inscripcion: {
        allowNull: false,
        type: Sequelize.DATE
      },
      estado: {
        allowNull: false,
        type: Sequelize.STRING
      },
      divulgador_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Administradors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Eventos');
  }
};