import type { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

import { newItemScheme } from '@/components/NewItemForm/NewItemForm';
import { withAuthentication } from '@/lib/api-middlewares/with-authentication';
import { withCatch } from '@/lib/api-middlewares/with-catch';
import { withMethods } from '@/lib/api-middlewares/with-methods';
import { paginationSchema } from '@/lib/schema';
import blogService from '@/services/blog.service';
import htmlService from '@/services/html.service';
import itemService from '@/services/item.service';

const itemsIndexHandler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    const query = await paginationSchema.validate(req.query);

    const data = await itemService.getItems({
      cursor: query.cursor,
      limit: query.limit,
    });

    return res.status(200).json({
      data,
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
      description: body.title,
      url: body.url,
      title: scrapped.title ?? body.title,
      thumbnail: scrapped?.thumbnail,
      favicon: scrapped?.favicon,
    });

    return res.status(201).json(item);
  }
};

export default withCatch(withMethods(['GET', 'POST'], withAuthentication(itemsIndexHandler)));
