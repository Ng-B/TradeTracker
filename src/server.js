const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Trade = require('./models/Trade');
const config = require('../config');

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));



// MongoDB Connection
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.redirect('/trades');
});
  
app.get('/trades', async (req, res) => {
  try {
    const trades = await Trade.find();
    res.render('index', { trades });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the trades.');
  }
});

app.post('/trades', async (req, res) => {
  try {
    const { price, pair, lot, openTime, hour, minute, sl, tp, result, closeTime, comment } = req.body;

    const newTrade = new Trade({
      price,
      pair,
      lot,
      openTime,
      hour,
      minute,
      sl,
      tp,
      result,
      closeTime,
      comment
    });

    await newTrade.save();
    res.redirect('/trades');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while adding the trade.');
  }
});

// Update a trade
app.put('/trades/:id', async (req, res) => {
  try {
    const { result, closeTime, comment } = req.body;
    const trade = await Trade.findByIdAndUpdate(req.params.id, { result, closeTime, comment }, { new: true });

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the trade.');
  }
});

app.delete('/trades/:tradeId', (req, res) => {
  const tradeId = req.params.tradeId;

  // Delete the trade from the database
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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Helper function to format date and time in 24-hour format
function formatDate(date) {
  const formattedDate = new Date(date);

  // Get the parts of the date and time
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const day = String(formattedDate.getDate()).padStart(2, '0');
  const hours = String(formattedDate.getHours()).padStart(2, '0');
  const minutes = String(formattedDate.getMinutes()).padStart(2, '0');

  // Create the formatted date string in the 24-hour format
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}