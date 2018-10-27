const { User } = require('../database/models');

const seedDatabase = async () => {
  await Promise.all([
    User.create({
      firstName: "Andrew",
      lastName: "Brim",
      email: "ab@123.com",
      password: "ab123"
    }),
    User.create({
      firstName: "Carl",
      lastName: "Duran",
      email: "cd@123.com",
      password: "cd123"
    }),
    User.create({
      firstName: "Earl",
      lastName: "Ford",
      email: "ef@123.com",
      password: "ef123"
    })
  ]);
}

module.exports = seedDatabase;
