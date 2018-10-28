const { User, Transaction } = require('../database/models');

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

const populateTransactionsTable = async () => {
  await Promise.all([
    Transaction.create({
      requestType: "BUY",
      tickerSymbol: "AAPL",
      amountOfShares: 1,
      pricePerShare: 250,
      userId: 1
    }),
    Transaction.create({
      requestType: "BUY",
      tickerSymbol: "AAPL",
      amountOfShares: 2,
      pricePerShare: 250,
      userId: 2
    }),
    Transaction.create({
      requestType: "BUY",
      tickerSymbol: "AAPL",
      amountOfShares: 3,
      pricePerShare: 250,
      userId: 3
    })
  ]);
}

const seedDatabase = async () => {
  try {
    await populateUsersTable();
    await populateTransactionsTable();
    console.log("Successfully seeded!");
    process.exit(0);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedDatabase();
