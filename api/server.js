const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const uri = process.env.MONGODB_URI;
console.log('MONGODB_URI:', uri);

if (!uri) {
  console.error('MONGODB_URI is not defined. Check your .env file.');
  process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const Story = mongoose.model('Story', new mongoose.Schema({
  part: String,
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
}));

app.post('/api/submit-part', async (req, res) => {
  console.log('POST /api/submit-part called');
  const { part, name, email } = req.body;

  const newPart = new Story({
    part,
    name,
    email,
  });

  try {
    await newPart.save();
    console.log('Part saved successfully');
    res.status(201).json({ message: 'Part saved successfully.' });
  } catch (err) {
    console.error('Error saving part:', err);
    res.status(500).json({ message: 'Failed to save part.', error: err });
  }
});

app.get('/api/current-story', async (req, res) => {
  console.log('GET /api/current-story called');

  try {
    const story = await Story.findOne({}, {}, { sort: { 'createdAt': -1 } });
    if (!story) {
      console.log('No story found');
      return res.status(404).json({ message: 'No story found' });
    }
    console.log('Story found:', story.part);
    res.status(200).json({ currentPart: story.part });
  } catch (err) {
    console.error('Error fetching story:', err);
    res.status(500).json({ message: 'Failed to fetch story.', error: err });
  }
});

app.get('/test', (req, res) => {
  console.log('GET /test called');
  res.status(200).send('Test route is working');
});

module.exports = app;








































