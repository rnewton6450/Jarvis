const Note = require('../models/Note');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, category, content } = req.body;
  if (!userId || !category || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const note = new Note({ userId, category, content });
    await note.save();
    res.status(201).json({ message: 'Note added successfully', note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
