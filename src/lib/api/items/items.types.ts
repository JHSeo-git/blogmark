import type { SerializedItem } from '@/services/item.service/item.service';

export interface CreateItemParams {
  title: string;
  description?: string;
  url: string;
}
export type CreateItemResponse = SerializedItem;

export interface GetItemsParams {
  cursor?: number;
  limit?: number;
}
export interface GetItemsResponse {
  items: SerializedItem[];
  pageInfo: {
    nextCursor: number;
    hasNextPage: boolean;
  };
}
