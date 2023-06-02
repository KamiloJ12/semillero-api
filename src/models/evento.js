'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Evento.belongsTo(models.Administrador, {
        foreignKey: 'divulgador_id',
        as: 'divulgador',
      });
    }
  }
  Evento.init({
    titulo: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: { 
      type: DataTypes.TEXT,
      allowNull: false
    },
    fecha_inicio: { 
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_fin: { 
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_inicio_inscripcion: { 
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_fin_inscripcion: { 
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Activo', 'Inactivo']]
      }
    },
    divulgador_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Evento',
  });
  return Evento;
};