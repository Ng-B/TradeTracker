const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Trade = require('./models/Trade');

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

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

// Routes
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
    const { date, pair, lot, openTime, hour, minute, sl, tp, result, closeTime, comment } = req.body;

    const newTrade = new Trade({
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
      comment
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