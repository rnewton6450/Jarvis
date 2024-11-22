import connectToDatabase from '../../utils/mongo';
import SetupNote from '../../models/SetupNote';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, preferences } = req.body;

  if (!userId || !preferences) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await connectToDatabase();
    const setupNote = new SetupNote({ userId, preferences });
    await setupNote.save();
    res.status(201).json({ message: 'Setup completed successfully', setupNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
