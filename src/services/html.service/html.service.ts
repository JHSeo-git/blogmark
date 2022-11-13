import { load } from 'cheerio';

import AppError, { isCodeError } from '@/lib/error';
import {
  scrapDescription,
  scrapFaviconUrl,
  scrapFaviconUrlByUrl,
  scrapPublisher,
  scrapPublisherByUrl,
  scrapThumbnailUrl,
  scrapTitle,
} from '@/lib/scraper';

const htmlService = {
  async scraper(url: string) {
    try {
      const response = await fetch(url);

      const html = await response.text();

      if (!html) {
        throw new AppError('URLBadRequest');
      }

      const $ = load(html);

      const title = scrapTitle($);
      const description = scrapDescription($);
      const faviconUrl = scrapFaviconUrl($);
      const thumbnailUrl = scrapThumbnailUrl($);

      const urlObject = new URL(url);

      const thumbnail = thumbnailUrl ? generateAssetUrl(urlObject, thumbnailUrl) : undefined;
      const favicon = faviconUrl
        ? generateAssetUrl(urlObject, faviconUrl)
        : scrapFaviconUrlByUrl(url);
      const domain = urlObject.hostname;
      const publisher = scrapPublisher($) ?? scrapPublisherByUrl(url);

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

const generateAssetUrl = (url: URL, assetUrl: string) => {
  let asset = assetUrl;

  if (assetUrl.startsWith('/')) {
    asset = `${url.origin}${assetUrl}`;
  }

  return asset;
};

export default htmlService;
