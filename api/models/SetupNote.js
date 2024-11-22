const mongoose = require('mongoose');

const setupNoteSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  timezone: { type: String, required: true },
  trackingCategories: [{ type: String }],
  setupCompleted: { type: Boolean, default: false },
  setupTimestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SetupNote', setupNoteSchema);
