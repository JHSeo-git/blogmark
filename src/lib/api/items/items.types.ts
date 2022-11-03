import type { SerializedItem } from '@/services/item.service/item.service';

export interface CreateItemParams {
  title: string;
  description?: string;
  url: string;
}

export type CreateItemResponse = SerializedItem;
