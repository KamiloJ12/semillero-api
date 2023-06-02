'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Miembro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Miembro.belongsToMany(models.Proyecto, {
        through: models.MiembroProyecto,
        foreignKey: 'miembro_id',
        otherKey: 'proyecto_id',
        as: 'proyectos',
      });
    }
  }
  Miembro.init({
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
      unique: true,
      allowNull: false
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: false
    },
    identificacion: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    codigo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    } ,
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    semestre_actual: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    modelName: 'Miembro',
  });
  return Miembro;
};