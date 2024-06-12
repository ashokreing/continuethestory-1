const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
const uri = process.env.MONGODB_URI;
console.log('MONGODB_URI:', uri);

if (!uri) {
  console.error('MONGODB_URI is not defined. Check your .env file.');
  process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Importar rutas
const storyRoutes = require('../server/routes/story');
app.use('/api', storyRoutes);

// Endpoint de prueba para verificar la API
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Ruta para manejar 404
app.use((req, res) => {
  console.error(`404 - Not Found - ${req.originalUrl}`);
  res.status(404).json({ message: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;























































