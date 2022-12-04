import type { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import { withCatch } from '@/lib/api-middlewares/with-catch';
import { withMethods } from '@/lib/api-middlewares/with-methods';
import { authOptions } from '@/lib/auth';
import { itemSchema } from '@/lib/validations/item';
import { paginationSchema } from '@/lib/validations/pagination';
import blogService from '@/services/blog.service';
import htmlService from '@/services/html.service';
import itemService from '@/services/item.service';

const itemsIndexHandler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    const query = await paginationSchema.parseAsync(req.query);

    const data = await itemService.getItems({
      page: query.page,
      limit: query.limit,
    });

    return res.status(200).json(data);
  }

  if (method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(403).end();
    }

    const decodedBody = {
      ...req.body,
      url: decodeURIComponent(req.body.url),
    };

    const body = await itemSchema.parseAsync(decodedBody);

    const scrapped = await htmlService.scraper(body.url);

    const blog = await blogService.getBlog({
      url: body.url,
      favicon: scrapped.favicon,
      publisher: scrapped.publisher,
    });

    const item = await itemService.createItem({
      title: scrapped?.title || body.title,
      description: body.title,
      url: body.url,
      thumbnail: scrapped?.thumbnail,
      favicon: scrapped?.favicon,
      userId: session.user.id,
      blogId: blog.id,
    });

    return res.status(201).json(item);
  }
};

export default withCatch(withMethods(['GET', 'POST'], itemsIndexHandler));
