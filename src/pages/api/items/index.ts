import type { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import { newItemScheme } from '@/components/NewItemForm/NewItemForm';
import { withCatch } from '@/lib/api-middlewares/with-catch';
import { withMethods } from '@/lib/api-middlewares/with-methods';
import { authOptions } from '@/lib/auth';
import { paginationSchema } from '@/lib/schema';
import blogService from '@/services/blog.service';
import fbService from '@/services/fb.service';
import htmlService from '@/services/html.service';
import itemService from '@/services/item.service';

const itemsIndexHandler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    const query = await paginationSchema.validate(req.query);

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

    const body = await newItemScheme.validate(decodedBody);

    const [scrapped, openGraph] = await Promise.all([
      htmlService.scraper(body.url),
      fbService.scrapOpenGraph(body.url),
    ]);

    const blog = await blogService.getBlogByUrl({
      url: body.url,
      favicon: scrapped.favicon,
      publisher: openGraph?.site_name || scrapped.publisher,
    });

    const item = await itemService.createItem({
      title: openGraph?.title || scrapped?.title || body.title,
      description: body.title,
      url: body.url,
      thumbnail: openGraph.image?.at(0)?.url || scrapped?.thumbnail,
      favicon: scrapped?.favicon,
      userId: session.user.id,
      blogId: blog.id,
    });

    return res.status(201).json(item);
  }
};

export default withCatch(withMethods(['GET', 'POST'], itemsIndexHandler));
