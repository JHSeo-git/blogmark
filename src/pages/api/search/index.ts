import type { NextApiHandler } from 'next';
import sanitize from 'sanitize-html';

import { withCatch } from '@/lib/api-middlewares/with-catch';
import { withMethods } from '@/lib/api-middlewares/with-methods';
import { searchSchema } from '@/lib/validations/search';
import itemService from '@/services/item.service';
import searchService from '@/services/search.service';

const searchIndexHandler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    const params = await searchSchema.parseAsync(req.query);

    const searchItems = await searchService.search({
      query: params.q,
      page: params.page,
      limit: params.limit,
    });

    const items = await itemService.getItemsByIds(searchItems.items.map((item) => item.id));

    const serialized = searchItems.items
      .filter((searchItem) => items.find((item) => item.id === searchItem.id))
      .map((searchItem) => {
        const item = items.find((item) => item.id === searchItem.id);
        return {
          ...item,
          highlight: {
            title: sanitize(searchItem._highlightResult?.title?.value ?? ''),
            description: sanitize(searchItem._highlightResult?.description?.value ?? ''),
          },
        };
      });

    return res.status(200).json({
      items: serialized,
      pageInfo: searchItems.pageInfo,
    });
  }
};

export default withCatch(withMethods(['GET'], searchIndexHandler));
