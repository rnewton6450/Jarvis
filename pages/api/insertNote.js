import connectToDatabase from '../../utils/mongo';
import Note from '../../models/Note';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, note } = req.body;

  if (!userId || !note) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await connectToDatabase();
    const newNote = new Note({ userId, note });
    await newNote.save();
    res.status(201).json({ message: 'Note inserted successfully', newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
