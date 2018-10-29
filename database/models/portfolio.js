const Sequelize = require('sequelize');
const db = require('../db');

const Portfolio = db.define('portfolio', {

  stocks: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  }

});

module.exports = Portfolio;
