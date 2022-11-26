import type { CheerioAPI } from 'cheerio';

const thumbnails = [
  ($: CheerioAPI) => $('meta[property="og:image"]').attr('content'),
  ($: CheerioAPI) => $('meta[property="og:image:secure_url"]').attr('content'),
  ($: CheerioAPI) => $('meta[property="og:image:url"]').attr('content'),
  ($: CheerioAPI) => $('meta[name="twitter:image:src"]').attr('content'),
  ($: CheerioAPI) => $('meta[property="twitter:image:src"]').attr('content'),
  ($: CheerioAPI) => $('meta[name="twitter:image"]').attr('content'),
  ($: CheerioAPI) => $('meta[property="twitter:image"]').attr('content'),
  ($: CheerioAPI) => $('meta[itemprop="image"]').attr('content'),
];

export const scrapThumbnailUrl = ($: CheerioAPI): Promise<string | undefined> =>
  new Promise((resolve) => {
    for (let i = 0; i < thumbnails.length; i += 1) {
      const thumbnail = thumbnails[i];
      const name = thumbnail($);

      if (name) {
        resolve(name);
        break;
      }
    }
    resolve(undefined);
  });
