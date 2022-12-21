export interface SearchParams {
  query: string;
  page?: number;
  limit?: number;
}

export interface SearchItem {
  id: number;
  title: string;
  description: string;
  url: string;
  publisher: string;
  userName: string;
  calendarDate: string;
}
