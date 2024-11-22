import dbConnect from '../../lib/dbConnect';
import SetupNote from '../../models/SetupNote';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, timezone, trackingCategories } = req.body;

  if (!userId || !timezone || !trackingCategories) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const setupNote = await SetupNote.findOneAndUpdate(
      { userId },
      { timezone, trackingCategories, setupCompleted: true, setupTimestamp: new Date() },
      { upsert: true, new: true }
    );

    res.status(201).json({
      message: 'Setup note updated successfully',
      setupNote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
