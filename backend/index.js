require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-remover';
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected successfully...'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.log('Ensure MongoDB service is running locally on port 27017.');
  });

// Import Models
const Contact = require('./models/Contact');

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pricing', require('./routes/pricing'));

// Contact Route - saves to MongoDB
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await newContact.save();
    res.json({ success: true, message: 'Message submitted successfully' });
  } catch (err) {
    console.error('Contact submission error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Test Root Route
app.get('/', (req, res) => {
  res.send('AI Remover Auth & Database Backend API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
