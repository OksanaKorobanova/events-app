import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === 'GET') {
    const data = [{ id: '1', name: 'Oksana', text: 'hello' }];
    res.status(200).json({ comments: data });
    return;
  }
  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      !name.trim() === '' ||
      !text ||
      !text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    console.log(newComment);

    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db('events');

    await db.collection('comments').insertOne({ email: email });

    client.close();

    res.status(201).json({ message: 'Added comment', comment: newComment });
  }
}

export default handler;
