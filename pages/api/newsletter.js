import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email' });
      return;
    }

    const client = await MongoClient.connect(
      'mongodb+srv://oksanavitol:LiS8yU0CQWWTlGZr@cluster0.ydeabvx.mongodb.net/?retryWrites=true&w=majority'
    );
    const db = client.db('newsletter');

    await db.collection('emails').insertOne({ email: email });

    client.close();

    res.status(201).json({ message: 'Signed up' });
  }
}

export default handler;
