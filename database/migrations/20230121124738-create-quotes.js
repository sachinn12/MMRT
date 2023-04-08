'use strict';
const db = require('../../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quotes', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Open: {
        type: Sequelize.STRING
      },
      High: {
        type: Sequelize.STRING
      },
      Low: {
        type: Sequelize.STRING
      },
      Close: {
        type: Sequelize.STRING
      },
      Volume: {
        type: Sequelize.STRING
      },
      Interval: {
        type: Sequelize.STRING,
      },
      DateTime: {
        type: Sequelize.STRING
      },
      tickerid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tickers',
          key: 'id'
        }
      },
      dataproid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Dataproviders',
          key: 'id'
        }
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
    await queryInterface.dropTable('quotes');
  }
};