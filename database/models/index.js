// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const User = require('./user');
const Transaction = require('./transaction');

// Source ---> Target;
User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = {
  User,
  Transaction
};
