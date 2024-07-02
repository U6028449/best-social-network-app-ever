const { User } = require('../models');

const friendController = {
  // Add a friend to a user's friend list
  addFriend: async (req, res) => {
    try {
      // Add friendId to the user's friends array
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } }, // Use $addToSet to avoid duplicates
        { new: true, runValidators: true }
      ).populate('friends');
      if (!updatedUser) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Remove a friend from a user's friend list
  removeFriend: async (req, res) => {
    try {
      // Remove friendId from the user's friends array
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      ).populate('friends');
      if (!updatedUser) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

module.exports = friendController;
