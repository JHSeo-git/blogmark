import type { NextApiHandler } from 'next';

const itemsIndexHandler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get data from your database
      break;
    case 'POST':
      // Update or create data in your database
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }

  res.status(200).json({ name: 'John Doe' });
};

export default itemsIndexHandler;
