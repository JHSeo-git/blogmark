import qs from 'qs';

import client from '../client';
import type {
  CreateItemParams,
  CreateItemResponse,
  DeleteItemResponse,
  DeleteLikeItemResponse,
  GetItemsParams,
  GetItemsResponse,
  LikeItemResponse,
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

export async function deleteItem(itemId: number) {
  const data = await client.delete<DeleteItemResponse>(`/api/items/${itemId}`);

  return data;
}

export async function likeItem(itemId: number) {
  const data = await client.post<LikeItemResponse>(`/api/items/${itemId}/like`);

  return data;
}

export async function deleteLikeItem(itemId: number) {
  const data = await client.delete<DeleteLikeItemResponse>(`/api/items/${itemId}/like`);

  return data;
}
