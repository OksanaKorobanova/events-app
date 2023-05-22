import { connectDb, insertDoc, getAllDocuments } from '@/helpers/db-util';

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: 'Connection to db failed' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', {
        eventId: eventId,
      });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Get comments failed' });
    }
    client.close();
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
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDoc(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Insert comment failed' });
    }
    client.close();
  }
}

export default handler;
