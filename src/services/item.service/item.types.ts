export interface GetItemsParams {
  page?: number;
  limit?: number;
  userId?: string;
}

export interface GetItemsByCursorParams {
  cursor?: number;
  limit?: number;
  userId?: string;
}

export interface CreateItemParams {
  userId: string;
  blogId: number;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  favicon?: string;
}

export interface DeleteItemParams {
  userId: string;
  itemId: number;
}

export interface LikeItemParams {
  userId: string;
  itemId: number;
}
