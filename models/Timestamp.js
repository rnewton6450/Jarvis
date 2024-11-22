const mongoose = require('mongoose');

const timestampSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  gptResponse: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Timestamp', timestampSchema);
