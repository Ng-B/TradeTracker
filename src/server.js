const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Connection
const mongoURI = 'mongodb+srv://naodg67:mydb123123@cluster0.fihii9o.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define ForexTrade Schema
const forexTradeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  pair: { type: String, required: true },
  lot: { type: Number, required: true },
  openTime: { type: String, required: true },
  hour: { type: Number, required: true },
  minute: { type: Number, required: true },
  sl: { type: Number, required: true },
  tp: { type: Number, required: true },
  result: { type: String, required: true },
  closeTime: { type: String, required: true },
  comment: { type: String } // New field for comments
});

const ForexTrade = mongoose.model('ForexTrade', forexTradeSchema);

// Routes
app.get('/trades', async (req, res) => {
  try {
    const trades = await ForexTrade.find();
    res.render('index', { trades });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the trades.');
  }
});

app.post('/trades', async (req, res) => {
  try {
    const { date, pair, lot, openTime, hour, minute, sl, tp, result, closeTime, comment } = req.body;

    const newTrade = new ForexTrade({
      date,
      pair,
      lot,
      openTime,
      hour,
      minute,
      sl,
      tp,
      result,
      closeTime,
      comment // Save the comment in the trade
    });

    await newTrade.save();
    res.redirect('/trades');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while adding the trade.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
