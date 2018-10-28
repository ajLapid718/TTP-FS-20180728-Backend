const express = require('express');
const router = express.Router();
const { User } = require('../../database/models');

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
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

module.exports = router;
