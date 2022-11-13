import type { CheerioAPI } from 'cheerio';

const favicons = [
  ($: CheerioAPI) => $('meta[property="og:logo"]').attr('content'),
  ($: CheerioAPI) => $('meta[itemprop="logo"]').attr('content'),
  ($: CheerioAPI) => $('img[itemprop="logo"]').attr('src'),
  ($: CheerioAPI) => $('link[rel="icon"]').attr('href'),
];

export const scrapFaviconUrl = ($: CheerioAPI) => {
  let generated: string | undefined;

  for (let i = 0; i < favicons.length; i += 1) {
    const favicon = favicons[i];
    const name = favicon($);

    if (name) {
      generated = name;
      break;
    }
  }

  return generated;
};

export const scrapFaviconUrlByUrl = (url: string) => {
  const urlObject = new URL(url);

  return `${urlObject.origin}/favicon.ico`;
};
