import type { SerializedItem } from '@/services/item.service/item.service';
import type { SearchParams } from '@/services/search.service/search.types';

export type SearchItemsParams = SearchParams;

export type SearchItem = SerializedItem & {
  highlight?: {
    title?: string;
    description?: string;
  };
};
export interface SearchItemsResponse {
  items: SearchItem[];
  pageInfo: {
    currentPage?: number;
    nextPage?: number;
    total: number;
  };
}
