const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const moment = require('moment'); 

// Reaction schema
const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId() // Default value set to a new ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default value to the current timestamp
    get: (createdAtVal) => moment(createdAtVal).format('MMMM Do YYYY, h:mm:ss a') // Format date on query
  }
}, {
  timestamps: true, // Include timestamps
  toJSON: { getters: true } // Enable getters so the formatted date is used
});

const Reaction = model('Reaction', ReactionSchema);
exports.Reaction = Reaction;
exports.ReactionSchema = ReactionSchema;