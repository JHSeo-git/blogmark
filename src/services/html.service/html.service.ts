import { load } from 'cheerio';

import AppError from '@/lib/error';

const htmlService = {
  scraper: async (url: string) => {
    try {
      const response = await fetch(url);

      const html = await response.text();

      if (!html) {
        return null;
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
