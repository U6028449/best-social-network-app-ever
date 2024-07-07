const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Corrected: Define a route directly on the app
app.get('/', (req, res) => {
  res.send('User route');
});

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => console.error(err));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Import routes
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Start the server
app.listen(PORT, () => console.log(`🌍 Server running on http://localhost:${PORT}`));

// Remove the incorrect export as it's not defined in the provided code snippet
// module.exports = router;
