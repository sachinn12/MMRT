'use strict';
const db = require('../../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticker: {
        type: Sequelize.STRING,
        primaryKey:true,
        unique:true
      },
      fullname: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      assetclass: {
        type: Sequelize.STRING,
        allowNull:true
      },
      // ExchangeId: {
      //   type: Sequelize.INTEGER,
      //   allowNull:true,
        
      // },
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
    await queryInterface.dropTable('Tickers');
  }
};

