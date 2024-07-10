const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');

const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought } = require('../controllers/thoughtController');

// Fetch all thoughts
router.get('/', getAllThoughts);

// Route to get all reactions - Moved up to prevent conflict
router.get('/reactions/all', reactionController.getAllReactions);

// Fetch a single thought by ID
router.get('/:id', getThoughtById);

// Create a new thought
router.post('/', createThought);

// Update a thought by ID
router.put('/:id', updateThought);

// Delete a thought by ID
router.delete('/:id', deleteThought);

// Route to add a reaction to a thought
router.post('/:thoughtId/reactions', reactionController.addReaction);

// Route to remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', reactionController.removeReaction);

module.exports = router;