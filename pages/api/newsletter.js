import { connectDb, insertDoc } from '@/helpers/db-util';

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email' });
      client.close();
      return;
    }

    let client;

    try {
      client = await connectDb();
    } catch (error) {
      res.status(500).json({ message: 'Connection to db failed' });
      return;
    }

    try {
      await insertDoc(client, 'newsletter', { email: email });
      res.status(201).json({ message: 'Signed up' });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data to db failed' });
    }

    client.close();
  }
}

export default handler;
