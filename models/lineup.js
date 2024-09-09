const mongoose = require('mongoose');

const lineupSchema = new mongoose.Schema({
  agent: {
    type: String,
    required: true
  },
  map: {
    type: String,
    required: true
  },
  ability: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  videoURL: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lineup', lineupSchema);
