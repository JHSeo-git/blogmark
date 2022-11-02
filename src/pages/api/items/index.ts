import type { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

import { withMethods } from '@/lib/api-middlewares/with-methods';
import itemService from '@/services/item.service';

const itemsIndexHandler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    try {
      const items = await itemService.getItems();

      return res.status(200).json(items);
    } catch (error) {
      res.status(500).end();
    }
  }

  if (method === 'POST') {
    try {
      const session = await getSession({ req });

      if (!session) {
        return res.status(403).end();
      }

      const item = await itemService.createItem({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        userId: session.user.id,
      });

      return res.status(201).json(item);
    } catch (error) {
      res.status(500).end();
    }
  }
};

export default withMethods(['GET', 'POST'], itemsIndexHandler);
