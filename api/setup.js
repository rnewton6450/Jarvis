const SetupNote = require('../models/SetupNote');

module.exports = async (req, res) => {
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
    res.status(200).json({ message: 'Setup completed successfully', setupNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
