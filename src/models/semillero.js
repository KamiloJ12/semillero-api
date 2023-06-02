'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Semillero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Semillero.init({
    mision: { 
      type: DataTypes.TEXT,
      allowNull: false
    },
    vision: { 
      type: DataTypes.TEXT,
      allowNull: false
    },
    facebook: DataTypes.STRING,
    youtube: DataTypes.STRING,
    gmail: DataTypes.STRING,
    twitter: DataTypes.STRING,
    github: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Semillero',
  });
  return Semillero;
};