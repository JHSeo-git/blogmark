import type { CheerioAPI } from 'cheerio';

const titles = [
  ($: CheerioAPI) => $('meta[property="og:title"]').attr('content'),
  ($: CheerioAPI) => $('meta[name="twitter:title"]').attr('content'),
  ($: CheerioAPI) => $('title').text(),
];

export const scrapTitle = ($: CheerioAPI): Promise<string | undefined> =>
  new Promise((resolve) => {
    for (let i = 0; i < titles.length; i += 1) {
      const title = titles[i];
      const name = title($);

      if (name) {
        resolve(parsedTitleOnly(name));
        break;
      }
    }
    resolve(undefined);
  });

const parsedTitleOnly = (title: string) => {
  const parsedTitle = title.split(' - ')[0].split(' | ')[0].split(' : ')[0].trim();

  return parsedTitle;
};
