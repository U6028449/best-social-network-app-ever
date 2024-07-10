const { Thought } = require('../models');

const reactionController = {
  // Add a reaction to a thought
  addReaction: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Remove a reaction from a thought
  removeReaction: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought found with this id or reaction not found!' });
        return;
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Add a method to get all reactions
  getAllReactions: async (req, res) => {
    try {
      const thoughts = await Thought.find({}).select('reactions');
      const allReactions = thoughts.map(thought => thought.reactions).flat();
      res.json(allReactions);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = reactionController;