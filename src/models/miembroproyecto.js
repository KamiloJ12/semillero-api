'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MiembroProyecto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MiembroProyecto.init({
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    miembro_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'MiembroProyecto',
  });
  return MiembroProyecto;
};