'use strict';
const {
  Model
} = require('sequelize');
const quotes = require('./quotes');
module.exports = (sequelize, DataTypes) => {
  class Ticker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      
      Ticker.hasMany(models.Quotes, {
        as:'quotes',
        foreignKey:'tickerid'
      })
    }
  }
  Ticker.init({
    // id:DataTypes.INTEGER,
    ticker: DataTypes.STRING,
    fullname: DataTypes.STRING,
    description: DataTypes.STRING,
    assetclass: DataTypes.STRING,
    // ExchangeIa: DataTypes.INTEGER,
  }, 
  {
    sequelize,
    modelName: 'Ticker',
  });

  return Ticker;
 
  };



