const express = require('express');
const router = express.Router();
const { Transaction } = require('../database/models');

router.post('/', function(req, res, next) {
  Transaction.create(req.body)
    .then(() => res.status(201).send("Created!"))
    .catch(next)
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
