import dbConnect from '../../../lib/dbConnect';
import Note from '../../../models/Note';

export default async function handler(req, res) {
  await dbConnect(); // Connect to the database

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, title, content } = req.body;

  if (!userId || !title || !content) {
    return res.status(400).json({ error: 'Missing required fields: userId, title, or content' });
  }

  try {
    const note = new Note({ userId, title, content });
    await note.save();

    res.status(201).json({
      message: 'Note created successfully',
      note,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
