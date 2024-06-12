const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// Endpoint para obtener la parte actual de la historia
router.get('/current-story', async (req, res) => {
  try {
    const latestPart = await Story.find().sort({ createdAt: -1 }).limit(1);
    res.json({ currentPart: latestPart[0] ? latestPart[0].part : 'The story begins here...' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint para enviar una nueva parte de la historia
router.post('/submit-part', async (req, res) => {
  const { part, name, email } = req.body;

  try {
    const newPart = new Story({ part, name, email });
    await newPart.save();
    res.status(201).json({ message: 'Part submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;











  