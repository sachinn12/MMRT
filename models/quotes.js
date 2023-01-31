'use strict';
const {
  Model
} = require('sequelize');
  const Tickers = require('./ticker');
module.exports = (sequelize, DataTypes) => {
  class Quotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quotes.belongsTo(models.Ticker,{
        foreignKey:'tickerid'
      });

     
    }
  }
  Quotes.init({
    // TimeFrame: DataTypes.STRING,
    // DateTime: DataTypes.STRING,
    Open: DataTypes.STRING,
    High: DataTypes.STRING,
    Low: DataTypes.STRING,
    Close: DataTypes.STRING,
    Volume: DataTypes.STRING,
    Interval:DataTypes.STRING,
    DateTime:DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Quotes',
  });

  

  

  return Quotes;
};
