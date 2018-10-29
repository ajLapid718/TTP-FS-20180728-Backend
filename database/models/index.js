// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

// Registering our models;
const User = require('./user');
const Transaction = require('./transaction');
const Portfolio = require('./portfolio');

// Setting up associations;
User.hasMany(Transaction);
Transaction.belongsTo(User);

User.hasOne(Portfolio);
Portfolio.belongsTo(User);

// Barrel;
module.exports = {
  User,
  Transaction,
  Portfolio
};
