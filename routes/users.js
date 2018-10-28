const express = require('express');
const router = express.Router();
const { User } = require('../database/models');

router.get('/:email', function(req, res, next) {
  User.findByEmail(req.params.email)
    .then(foundUser => res.json(foundUser))
    .catch(err => next(err));
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
