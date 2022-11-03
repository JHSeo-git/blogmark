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

      const thumbnail = thumbnailUrl ? generateThumbnailUrl(url, thumbnailUrl) : null;

      return {
        title,
        description,
        thumbnail,
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

const generateThumbnailUrl = (url: string, thumbnailUrl: string) => {
  let thumbnail = thumbnailUrl;

  if (thumbnailUrl.startsWith('/')) {
    const urlObject = new URL(url);
    thumbnail = `${urlObject.origin}${thumbnailUrl}`;
  }

  return thumbnail;
};

export default htmlService;
