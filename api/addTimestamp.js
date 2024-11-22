const Timestamp = require('../models/Timestamp');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, gptResponse } = req.body;
  if (!userId || !gptResponse) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const timestamp = new Timestamp({ userId, gptResponse });
    await timestamp.save();
    res.status(201).json({ message: 'Timestamp logged successfully', timestamp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
