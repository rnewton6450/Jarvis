import mongoose from 'mongoose';

const SetupNoteSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  timezone: { type: String, required: true },
  trackingCategories: { type: [String], required: true },
  setupCompleted: { type: Boolean, default: false },
  setupTimestamp: { type: Date, default: Date.now },
});

export default mongoose.models.SetupNote || mongoose.model('SetupNote', SetupNoteSchema);
