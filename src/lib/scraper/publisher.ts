import type { CheerioAPI } from 'cheerio';

/**
 * @see https://github.com/microlinkhq/metascraper/blob/master/packages/metascraper-publisher/index.js
 */
const publishers = [
  ($: CheerioAPI) => $('meta[property="og:site_name"]').attr('content'),
  ($: CheerioAPI) => $('meta[name="application-name"]').attr('content'),
  ($: CheerioAPI) => $('meta[name*="app-title" i]').attr('content'),
  ($: CheerioAPI) => $('meta[property*="app_name" i]').attr('content'),
  ($: CheerioAPI) => $('meta[name="publisher" i]').attr('content'),
  ($: CheerioAPI) => $('meta[name="twitter:app:name:iphone"]').attr('content'),
  ($: CheerioAPI) => $('meta[name="twitter:app:name:ipad"]').attr('content'),
  ($: CheerioAPI) => $('meta[property="twitter:app:name:iphone"]').attr('content'),
  ($: CheerioAPI) => $('meta[name="twitter:app:name:googleplay"]').attr('content'),
  ($: CheerioAPI) => $('meta[property="twitter:app:name:googleplay"]').attr('content'),
  ($: CheerioAPI) => $('[class*="logo" i] a img[alt]').attr('alt'),
  ($: CheerioAPI) => $('[class*="logo" i] img[alt]').attr('alt'),
];

export const scrapPublisher = ($: CheerioAPI) => {
  let generated: string | undefined;

  for (let i = 0; i < publishers.length; i += 1) {
    const publisher = publishers[i];
    const name = publisher($);

    if (name) {
      generated = name;
      break;
    }
  }

  return generated;
};

const EXCEPT_URL = /.+\/\/|www.|\..+/g;
export const scrapPublisherByUrl = (url: string) => url.replace(EXCEPT_URL, '');
