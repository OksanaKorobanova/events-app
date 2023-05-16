import { use } from 'react';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email' });
      return;
    }

    console.log(email);
  }
  res.status(200).json({ name: 'John Doe' });
}
