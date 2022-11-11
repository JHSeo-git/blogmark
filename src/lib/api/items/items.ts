import client from '../client';
import type { CreateItemParams, CreateItemResponse, GetItemsResponse } from './items.types';

export async function createItem(params: CreateItemParams) {
  const data = await client.post<CreateItemResponse>('/api/items', params);

  return data;
}

// TODO: pagination
export async function getItems() {
  const data = await client.get<GetItemsResponse>('/api/items', { cache: 'no-store' });

  return data;
}
