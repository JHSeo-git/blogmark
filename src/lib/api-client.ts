import { delimiterSearchParam } from './utils';

type ClientOpeion = Omit<RequestInit, 'method'> & {
  accessToken?: string;
};

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

  generateUrl(url: string, accessToken?: string) {
    const generatedUrl = `${this.baseUrl}${url}`;

    const accessTokenQuery = `${delimiterSearchParam(generatedUrl)}access_token=${
      accessToken ?? ''
    }`;
    const addedUrl = `${generatedUrl}${accessTokenQuery}`;

    return addedUrl;
  }

  get<TResponse>(url: string, option?: ClientOpeion | undefined) {
    const generatedUrl = this.generateUrl(url, option?.accessToken);

    return ApiClient.request<TResponse>(generatedUrl, {
      ...option,
      method: 'GET',
    });
  }

  post<TResponse>(url: string, body: object, option?: ClientOpeion | undefined) {
    const generatedUrl = this.generateUrl(url, option?.accessToken);

    return ApiClient.request<TResponse>(generatedUrl, {
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
