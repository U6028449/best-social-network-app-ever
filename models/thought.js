const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const moment = require('moment'); // Assuming you're using moment.js for date formatting

// Reaction schema
const reactionSchema = new Schema({
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
  timestamps: true, // Automatically create createdAt and updatedAt fields
  toJSON: { getters: true } // Enable getters so the formatted date is used
});

// Thought schema
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => moment(createdAtVal).format('MMMM Do YYYY, h:mm:ss a') // Format date on query
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema] // Array of nested documents using the Reaction schema
}, {
  toJSON: {
    getters: true, // Enable getters so the formatted date is used
    virtuals: true // Ensure virtual fields are included whenever data is converted to JSON
  },
  id: false
});

// Virtual for reactionCount
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;