import qs from 'qs';

import fbClient from '../fbClient';
import type { FaceBookScrapQueryParams, ScrapByUrlParams, ScrapByURLResponse } from './scrap.types';

export async function scrapByUrl({ url }: ScrapByUrlParams) {
  const facebookScrapQueryParams: FaceBookScrapQueryParams = { id: url, scrape: true };
  const query = qs.stringify(facebookScrapQueryParams, { addQueryPrefix: true });

  const data = await fbClient.post<ScrapByURLResponse>(query, {});

  return data;
}
