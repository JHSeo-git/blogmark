import qs from 'qs';

import client from '../client';
import type {
  CreateItemParams,
  CreateItemResponse,
  GetItemsParams,
  GetItemsResponse,
} from './items.types';

export async function createItem(params: CreateItemParams) {
  const data = await client.post<CreateItemResponse>('/api/items', params);

  return data;
}

export async function getItems({ page, limit }: GetItemsParams) {
  const query = qs.stringify({ page, limit }, { addQueryPrefix: true });

  const data = await client.get<GetItemsResponse>(`/api/items${query}`);

  return data;
}
