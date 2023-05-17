export default function handler(req, res) {
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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);
    res.status(201).json({ message: 'Added comment', comment: newComment });
  }
}
