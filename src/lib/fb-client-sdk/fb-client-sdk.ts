import type { ScrapByURLResponse } from './fd-client-sdk.types';

if (!process.env.NEXT_PUBLIC_FB_APP_ID || !process.env.NEXT_PUBLIC_FB_SECRET_CODE) {
  throw new Error(
    'Please define the NEXT_PUBLIC_FB_APP_ID and NEXT_PUBLIC_FB_SECRET_CODE environment variables',
  );
}

const accessToken = `${process.env.NEXT_PUBLIC_FB_APP_ID}|${process.env.NEXT_PUBLIC_FB_SECRET_CODE}`;

export function scrapByUrl(url: string) {
  return new Promise<ScrapByURLResponse>((resolve) => {
    FB.api(
      '/',
      'post',
      {
        scrape: true,
        id: url,
        access_token: accessToken,
      },
      (response: ScrapByURLResponse) => {
        resolve(response);
      },
    );
  });
}
