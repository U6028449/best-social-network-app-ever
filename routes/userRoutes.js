const express = require('express');
const router = express.Router();

// Assuming there's a controller file with functions to handle requests
const { registerUser, loginUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');

// Middleware for validating request body (example)
const validateUser = (req, res, next) => {
  // Implement validation logic
  // If valid, call next()
  // If not valid, return an error response
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log error or handle it accordingly
  res.status(500).send({ error: 'An unexpected error occurred' });
};

// User registration with validation middleware
//router.post('/register', validateUser, registerUser);

// User login with validation middleware
//router.post('/login', validateUser, loginUser);

// Fetch a user profile by ID
router.get('/:id', getUserById);

// Update user information by ID with validation middleware
router.put('/:id', validateUser, updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

// Use the error handling middleware
router.use(errorHandler);

module.exports = router;