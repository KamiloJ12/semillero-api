'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proyecto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Proyecto.belongsTo(models.Administrador, {
        foreignKey: 'divulgador_id',
        as: 'divulgador',
      });
      Proyecto.belongsToMany(models.Miembro, {
        through: models.MiembroProyecto,
        foreignKey: 'proyecto_id',
        otherKey: 'miembro_id',
        as: 'equipo',
      });
    }
  }
  Proyecto.init({
    nombre: {
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
    linea_investigacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false
    },
    divulgador_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Proyecto',
  });
  return Proyecto;
};