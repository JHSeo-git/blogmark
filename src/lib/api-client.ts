type ClientOpeion = Omit<RequestInit, 'method'>;

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  static async request<TResponse>(url: string, config: RequestInit): Promise<TResponse> {
    const response = await fetch(url, config);

    const data = await response.json();

    return data;
  }

  get<TResponse>(url: string, option?: ClientOpeion | undefined) {
    return ApiClient.request<TResponse>(`${this.baseUrl}${url}`, {
      ...option,
      method: 'GET',
    });
  }

  post<TResponse>(url: string, body: object, option?: ClientOpeion | undefined) {
    return ApiClient.request<TResponse>(`${this.baseUrl}${url}`, {
      ...option,
      headers: {
        ...option?.headers,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body),
      method: 'POST',
    });
  }
}

export default ApiClient;
