const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {

  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password');
    }
  },

  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt');
    }
  },

  name: {
    type: Sequelize.VIRTUAL,
    get: function() {
      return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
    }
  }
});

// Class methods involving querying a user by e-mail address as well as salting and encrypting the user's input for the password field;
User.findByEmail = function(candidateEmail) {
  return User.findOne({
    where: {
      email: candidateEmail
    }
  });
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

// An instance method validating the accuracy of a potential password with the target password;
User.prototype.isCorrectPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

// A callback function for our lifecycle hooks to execute, which takes in an instance of the User class;
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

// Our lifecycle hooks;
User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;
