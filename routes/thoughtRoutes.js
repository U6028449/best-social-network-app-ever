const express = require('express');
const router = express.Router();

// Assuming there's a controller file with functions to handle requests
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought } = require('../controllers/thoughtController');

// Fetch all thoughts
router.get('/', getAllThoughts);

// Fetch a single thought by ID
router.get('/:id', getThoughtById);

// Create a new thought
router.post('/', createThought);

// Update a thought by ID
router.put('/:id', updateThought);

// Delete a thought by ID
router.delete('/:id', deleteThought);

module.exports = router;