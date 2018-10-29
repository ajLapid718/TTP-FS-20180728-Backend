const express = require('express');
const router = express.Router();
const { Transaction, Portfolio } = require('../database/models');
const getTickerPrice = require('../utilities/getTickerPrice');

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

router.get('/:id/portfolio', async function(req, res, next) {
  let portfolioOfUser;

  try {
    portfolioOfUser = await Portfolio.findOne({
      where: {
        userId: req.params.id
      }
    })
  }
  catch (err) {
    next(err);
  }

  const stocksWithPendingCurrentPrices = portfolioOfUser.stocks.map(async stock => {
    const pendingCurrentPrice = await getTickerPrice(stock.tickerSymbol)
    const currentPrice = pendingCurrentPrice.data;
    return { ...stock, currentPrice }
  });

  const stocksWithCurrentPrices = await Promise.all(stocksWithPendingCurrentPrices);

  portfolioOfUser.stocks = stocksWithCurrentPrices;

  res.status(200).json(portfolioOfUser);
});


// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
