import qs from 'qs';

import ApiClient from '@/lib/api-client';

import type {
  FaceBookScrapQueryParams,
  GetOpenGraphResponse,
  PostOpenGraphResponse,
} from './fb.types';

if (!process.env.FB_APP_ID || !process.env.FB_SECRET_CODE) {
  throw new Error('Please define the FB_APP_ID and FB_SECRET_CODE environment variables');
}

const accessToken = `${process.env.FB_APP_ID}|${process.env.FB_SECRET_CODE}`;

const baseUrl = 'https://graph.facebook.com/v15.0';

const fbClient = new ApiClient(baseUrl);

const fbService = {
  async getOpenGraph(url: string) {
    const facebookScrapQueryParams: FaceBookScrapQueryParams = {
      id: url,
      scrape: true,
      access_token: accessToken,
      fields: 'ob_object',
    };
    const query = qs.stringify(facebookScrapQueryParams, { addQueryPrefix: true });

    const data = await fbClient.get<GetOpenGraphResponse>(query);

    return data;
  },

  async postOpenGraph(url: string) {
    const facebookScrapQueryParams: FaceBookScrapQueryParams = {
      id: url,
      scrape: true,
      access_token: accessToken,
    };
    const query = qs.stringify(facebookScrapQueryParams, { addQueryPrefix: true });

    const data = await fbClient.post<PostOpenGraphResponse>(query, {});

    return data;
  },
};

export default fbService;
