import type { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

import { newItemScheme } from '@/components/NewItemForm/NewItemForm';
import { withAuthentication } from '@/lib/api-middlewares/with-authentication';
import { withCatch } from '@/lib/api-middlewares/with-catch';
import { withMethods } from '@/lib/api-middlewares/with-methods';
import blogService from '@/services/blog.service';
import htmlService from '@/services/html.service';
import itemService from '@/services/item.service';

const itemsIndexHandler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    // actually not used
    const items = await itemService.getItems();

    return res.status(200).json({
      data: items,
    });
  }

  if (method === 'POST') {
    const session = await getSession({ req });

    if (!session) {
      return res.status(403).end();
    }

    const body = await newItemScheme.validate(req.body);
    const scrapped = await htmlService.scraper(body.url);

    const blog = await blogService.getBlogByUrl({
      url: body.url,
      favicon: scrapped.favicon,
      publisher: scrapped.publisher,
    });

    const item = await itemService.createItem({
      userId: session.user.id,
      blogId: blog.id,
      title: body.title,
      description: body.description,
      url: body.url,
      thumbnail: scrapped?.thumbnail,
      favicon: scrapped?.favicon,
    });

    return res.status(201).json(item);
  }
};

export default withCatch(withMethods(['GET', 'POST'], withAuthentication(itemsIndexHandler)));
