const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {

  requestType: {
    type: Sequelize.ENUM('BUY', 'SELL'),
    allowNull: false
  },

  tickerSymbol: {
    type: Sequelize.STRING,
    allowNull: false
  },

  amountOfShares: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  pricePerShare: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

});

module.exports = Transaction;
