import { algolia } from '@/lib/algolia';

import type { SearchItem, SearchParams } from './search.types';

const searchService = {
  async search({ query, page = 1, limit = 20 }: SearchParams) {
    const response = await algolia.search(query, {
      page,
      hitsPerPage: limit,
    });

    const total = response.nbHits;

    return {
      items: response.hits,
      pageInfo: {
        currentPage: page,
        nextPage: total > page * limit ? page + 1 : undefined,
        total,
      },
    };
  },
  async save(item: SearchItem) {
    return algolia.saveObject({
      ...item,
      objectID: item.id.toString(),
    });
  },
  async delete(objectID: string | number) {
    return algolia.deleteObject(objectID.toString());
  },
};

export default searchService;
