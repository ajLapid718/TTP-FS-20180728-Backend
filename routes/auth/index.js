const express = require('express');
const router = express.Router();
const { User, Portfolio } = require('../../database/models');

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const defaultStock = {tickerSymbol: "AAPL", amountOfShares: 1, pricePerShare: 250};
    const portfolio = await Portfolio.build(defaultStock);
    await portfolio.setUser(user);
    await portfolio.save();
    req.login(user, err => (err ? next(err) : res.json(user)));
  }
  catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists!');
    }
    else {
      next(err);
    }
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email);
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    }
    else if (!user.isCorrectPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    }
    else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  }
  catch (err) {
    next(err);
  }
});

router.get('/me', (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

module.exports = router;
