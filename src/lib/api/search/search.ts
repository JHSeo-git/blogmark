import qs from 'qs';

import client from '../client';
import type { SearchItemsParams, SearchItemsResponse } from './search.types';

export async function searchItems({ query: q, page, limit }: SearchItemsParams) {
  const query = qs.stringify({ q, page, limit }, { addQueryPrefix: true });

  const data = await client.get<SearchItemsResponse>(`/api/search${query}`);

  return data;
}
