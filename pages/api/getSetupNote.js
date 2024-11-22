import connectToDatabase from '../../utils/mongo';
import SetupNote from '../../models/SetupNote';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.query;

  try {
    await connectToDatabase();
    const setupNote = await SetupNote.findOne({ userId });
    if (setupNote) {
      res.status(200).json(setupNote);
    } else {
      res.status(404).json({ error: 'Setup note not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
