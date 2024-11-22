import dbConnect from '../../../lib/dbConnect';
import SetupNote from '../../../models/SetupNote';

export default async function handler(req, res) {
  await dbConnect(); // Connect to the database

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing required field: userId' });
  }

  try {
    const setupNote = await SetupNote.findOne({ userId });

    if (setupNote) {
      res.status(200).json({ setupNote });
    } else {
      res.status(404).json({ error: 'Setup Note not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
