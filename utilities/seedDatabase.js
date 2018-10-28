const { User } = require('../database/models');

const populateUsersTable = async () => {
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

const seedDatabase = async () => {
  try {
    await populateUsersTable();
    console.log("Successfully seeded!");
    process.exit(0);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedDatabase();
