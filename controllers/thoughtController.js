const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by id
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought and push the thought's id to the associated user's thoughts array
  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: newThought._id } },
        { new: true, runValidators: true }
      );
      res.json(newThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a thought by id
  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a thought by id
  deleteThought: async (req, res) => {
    try {
      const thoughtToDelete = await Thought.findByIdAndDelete(req.params.id);
      if (!thoughtToDelete) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }

      //remove the thought from the user's thoughts array
      await User.findByIdAndUpdate(
        thoughtToDelete.userId,
        { $pull: { thoughts: req.params.id } },
        { new: true }
      );
      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = thoughtController;