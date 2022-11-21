export interface GetItemsParams {
  page?: number;
  limit?: number;
}

export interface GetItemsByCursorParams {
  cursor?: number;
  limit?: number;
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
