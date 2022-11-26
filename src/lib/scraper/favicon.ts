import type { CheerioAPI } from 'cheerio';

const favicons = [
  ($: CheerioAPI) => $('meta[property="og:logo"]').attr('content'),
  ($: CheerioAPI) => $('meta[itemprop="logo"]').attr('content'),
  ($: CheerioAPI) => $('img[itemprop="logo"]').attr('src'),
  ($: CheerioAPI) => $('link[rel="icon"]').attr('href'),
];

export const scrapFaviconUrl = ($: CheerioAPI): Promise<string | undefined> =>
  new Promise((resolve) => {
    for (let i = 0; i < favicons.length; i += 1) {
      const favicon = favicons[i];
      const name = favicon($);

      if (name) {
        resolve(name);
        break;
      }
    }
    resolve(undefined);
  });

export const scrapFaviconUrlByUrl = (url: string) => {
  const urlObject = new URL(url);

  return `${urlObject.origin}/favicon.ico`;
};
