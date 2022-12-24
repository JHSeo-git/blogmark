export interface SearchParams {
  query: string;
  page?: number;
  limit?: number;
}

export interface SearchItem {
  id: number;
  title: string;
  description?: string | null;
  url?: string | null;
  thumbnail?: string | null;
  favicon?: string | null;
  publisher: string;
  publisherUrl: string;
  userName?: string | null;
  calendarDate: string | null;
}
