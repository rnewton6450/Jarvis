const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await client.connect();
    const database = client.db('jarvisDB');
    const collection = database.collection('Setup_Note');

    const { userId } = req.body;
    const document = await collection.findOne({ _id: userId });

    if (document) {
      res.status(200).json({ document });
    } else {
      res.status(404).json({ error: 'Setup Note not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};
