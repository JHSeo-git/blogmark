import type { CheerioAPI } from 'cheerio';
import { load } from 'cheerio';

import AppError, { isCodeError } from '@/lib/error';

const htmlService = {
  async scraper(url: string) {
    try {
      const response = await fetch(url);

      const html = await response.text();

      if (!html) {
        throw new AppError('URLBadRequest');
      }

      const $ = load(html);

      const title = $('title').text();
      const description = $('meta[name="description"]').attr('content');
      const thumbnailUrl = $('meta[property="og:image"]').attr('content');
      const faviconUrl = $('link[rel="icon"]').attr('href');

      const urlObject = new URL(url);

      const thumbnail = thumbnailUrl ? generateAssetUrl(urlObject, thumbnailUrl) : null;
      const favicon = faviconUrl
        ? generateAssetUrl(urlObject, faviconUrl)
        : generateFaviconUrl(urlObject);
      const domain = urlObject.hostname;
      const publisher = generatePublisher($) ?? getPublisherFromUrl(url);

      return {
        title,
        description,
        thumbnail,
        favicon,
        domain,
        publisher,
      };
    } catch (e) {
      console.error(e);

      if (e instanceof TypeError) {
        if (isCodeError(e.cause)) {
          if (e.cause?.code === 'SELF_SIGNED_CERT_IN_CHAIN') {
            throw new AppError('SSLCertificateError');
          }
        }
      }

      throw new AppError('URLBadRequest');
    }
  },
};

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

const generatePublisher = ($: CheerioAPI) => {
  let generated: string | undefined;

  publishers.forEach((publisher) => {
    const name = publisher($);

    if (name) {
      generated = name;
      return false;
    }
  });

  return generated;
};

const generateAssetUrl = (url: URL, assetUrl: string) => {
  let asset = assetUrl;

  if (assetUrl.startsWith('/')) {
    asset = `${url.origin}${assetUrl}`;
  }

  return asset;
};

const generateFaviconUrl = (url: URL) => {
  return `${url.origin}/favicon.ico`;
};

const EXCEPT_URL = /.+\/\/|www.|\..+/g;
const getPublisherFromUrl = (url: string) => url.replace(EXCEPT_URL, '');

export default htmlService;
