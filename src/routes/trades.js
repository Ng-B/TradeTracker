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

module.exports = router;
