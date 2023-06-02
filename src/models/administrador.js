'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Administrador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Administrador.hasMany(models.Evento, {
        foreignKey: 'divulgador_id',
        as: 'eventos',
      });
      Administrador.hasMany(models.Proyecto, {
        foreignKey: 'divulgador_id',
        as: 'proyectos',
      })
    }
  }
  Administrador.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: false
    },
    identificacion: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Administrador', 'Superadministrador']]
      }
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Activo', 'Inactivo']]
      }
    }
  }, {
    sequelize,
    modelName: 'Administrador',
  });
  return Administrador;
};