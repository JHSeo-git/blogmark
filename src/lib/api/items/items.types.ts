import type { GetItems, SerializedItem } from '@/services/item.service/item.service';

export interface CreateItemParams {
  title: string;
  url: string;
}
export type CreateItemResponse = SerializedItem;

export interface GetItemsParams {
  page?: number;
  limit?: number;
}
export type GetItemsResponse = GetItems;

export interface LikeItemResponse {
  likes: number;
}
export type DeleteItemResponse = LikeItemResponse;
