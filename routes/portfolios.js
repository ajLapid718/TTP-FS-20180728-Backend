const express = require('express');
const router = express.Router();
const { Portfolio } = require('../database/models');

router.post('/', async (req, res, next) => {
  const currentPortfolio = await Portfolio.build(req.body);
  currentPortfolio.setUser(req.user);
  currentPortfolio.save()
    .then(() => res.status(201).send('Created!'))
    .catch(err => next(err))
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
