// index.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000; // Use PORT from environment or default to 3000

app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

// Define a schema and model
const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const Data = mongoose.model('Data', dataSchema);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Express server with MongoDB!');
});

// GET /api/hello endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express with MongoDB!' });
});

// POST /api/data endpoint (Create data)
app.post('/api/data', async (req, res) => {
  const { name, value } = req.body;
  if (!name || !value) {
    return res.status(400).json({ error: 'Name and value are required' });
  }

  try {
    const newData = new Data({ name, value });
    await newData.save();
    res.status(201).json({ message: 'Data saved successfully', data: newData });
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).json({ error: 'Error saving data' });
  }
});

// GET /api/data endpoint (Retrieve all data)
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    console.error('Error retrieving data:', err);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// Start the server locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// Export the app for Vercel
module.exports = app;
