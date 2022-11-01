import type { NextApiHandler } from 'next';

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
};

export default withMethods(['GET'], itemsIndexHandler);
