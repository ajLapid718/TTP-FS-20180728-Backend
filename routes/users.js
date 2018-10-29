const express = require('express');
const router = express.Router();
const { Transaction } = require('../database/models');

router.get('/:id/transactions', async function(req, res, next) {
  let transactionsOfUser;

  try {
    transactionsOfUser = await Transaction.findAll({
      where: {
        userId: req.params.id
      }
    })
  }
  catch (err) {
    next(err);
  }

  res.status(200).json(transactionsOfUser);
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
