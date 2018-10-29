const express = require('express');
const router = express.Router();
const { Transaction } = require('../database/models');

router.post('/', async (req, res, next) => {
  const currentTransaction = await Transaction.build(req.body);
  currentTransaction.setUser(req.user);
  currentTransaction.save()
    .then(() => res.status(201).send('Created!'))
    .catch(err => next(err))
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
