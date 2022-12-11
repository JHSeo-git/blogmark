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

export interface CreateItemParam {
  userId: string;
  blogId: number;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  favicon?: string;
}

export interface LikeItemParam {
  userId: string;
  itemId: number;
}
