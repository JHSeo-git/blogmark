import { load } from 'cheerio';

import AppError, { isCodeError } from '@/lib/error';

const htmlService = {
  scraper: async (url: string) => {
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

      const thumbnail = thumbnailUrl ? generateAssetUrl(url, thumbnailUrl) : null;
      const favicon = faviconUrl ? generateAssetUrl(url, faviconUrl) : generateFaviconUrl(url);

      return {
        title,
        description,
        thumbnail,
        favicon,
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

const generateAssetUrl = (url: string, assetUrl: string) => {
  let asset = assetUrl;

  if (assetUrl.startsWith('/')) {
    const urlObject = new URL(url);
    asset = `${urlObject.origin}${assetUrl}`;
  }

  return asset;
};

const generateFaviconUrl = (url: string) => {
  const urlObject = new URL(url);

  return `${urlObject.origin}/favicon.ico`;
};

export default htmlService;
