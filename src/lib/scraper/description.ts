import type { CheerioAPI } from 'cheerio';

const descriptions = [
  ($: CheerioAPI) => $('meta[name="description"]').attr('content'),
  ($: CheerioAPI) => $('meta[property="og:description"]').attr('content'),
  ($: CheerioAPI) => $('meta[name="twitter:description"]').attr('content'),
  ($: CheerioAPI) => $('meta[property="twitter:description"]').attr('content'),
  ($: CheerioAPI) => $('meta[itemprop="description"]').attr('content'),
];

export const scrapDescription = ($: CheerioAPI) => {
  let generated: string | undefined;

  for (let i = 0; i < descriptions.length; i += 1) {
    const description = descriptions[i];
    const name = description($);

    if (name) {
      generated = name;
      break;
    }
  }

  return generated;
};
