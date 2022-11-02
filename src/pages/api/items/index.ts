import type { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';
import * as yup from 'yup';

import { newItemScheme } from '@/components/NewItemForm/NewItemForm';
import { withMethods } from '@/lib/api-middlewares/with-methods';
import itemService from '@/services/item.service';

const itemsIndexHandler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    try {
      // TODO: paggination
      const items = await itemService.getItems();

      return res.status(200).json({
        data: items,
      });
    } catch (error) {
      res.status(500).end();
    }
  }

  if (method === 'POST') {
    try {
      const session = await getSession({ req });

      if (!session) {
        return res.status(401).end();
      }

      const body = await newItemScheme.validate(req.body);

      const item = await itemService.createItem({
        title: body.title,
        description: body.description,
        url: body.url,
        userId: session.user.id,
      });

      return res.status(201).json(item);
    } catch (error) {
      console.error(error);

      if (error instanceof yup.ValidationError) {
        res.status(400).json({ message: error.message });
      }

      res.status(500).end();
    }
  }
};

export default withMethods(['GET', 'POST'], itemsIndexHandler);
