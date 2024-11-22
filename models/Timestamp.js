import mongoose from 'mongoose';

const TimestampSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  gptResponse: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Timestamp || mongoose.model('Timestamp', TimestampSchema);
