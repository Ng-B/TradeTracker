const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');

// GET all trades
router.get('/', async (req, res) => {
  try {
    const trades = await Trade.find();
    res.render('index', { trades });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST a new trade
router.post('/', async (req, res) => {
  try {
    const trade = new Trade(req.body);
    await trade.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// PUT update a trade
router.put('/:id', async (req, res) => {
  try {
    const { result, closeTime, comment } = req.body;
    const trade = await Trade.findByIdAndUpdate(req.params.id, { result, closeTime, comment }, { new: true });

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.json(trade);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE trade route
router.delete('/trades/:tradeId', (req, res) => {
  const tradeId = req.params.tradeId;

  Trade.findByIdAndDelete(tradeId)
    .then((deletedTrade) => {
      if (!deletedTrade) {
        res.status(404).send('Trade not found');
        return;
      }
      res.status(200).send('Trade deleted successfully');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
