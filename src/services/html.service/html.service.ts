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

import fbService from '../fb.service';
import type { ScrapItem } from './html.types';

const htmlService = {
  async checkScrapable(url: string) {
    const response = await fetch(url, { method: 'HEAD' });

    if (!response.ok) {
      return false;
    }

    if (response.status !== 200) {
      return false;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.startsWith('text/html')) {
      return false;
    }

    return true;
  },

  async scraper(url: string): Promise<ScrapItem> {
    try {
      const scrapable = await this.checkScrapable(url);

      if (!scrapable) {
        const fbScrappedItem = await fbService.postOpenGraph(url);

        return {
          title: fbScrappedItem.title,
          description: fbScrappedItem.description,
          thumbnail: fbScrappedItem.image[0]?.url,
          favicon: scrapFaviconUrlByUrl(url),
          domain: fbScrappedItem.application.url,
          publisher: fbScrappedItem.site_name,
        };
      }

      const response = await fetch(url);

      const html = await response.text();

      if (!html) {
        throw new AppError('URLBadRequest');
      }

      const $ = load(html);

      const [
        scrappedTitle,
        scrappedDescription,
        scrappedThumbnailUrl,
        scrappedFaviconUrl,
        scrappedPublisher,
      ] = await Promise.all([
        scrapTitle($),
        scrapDescription($),
        scrapThumbnailUrl($),
        scrapFaviconUrl($),
        scrapPublisher($),
      ]);

      const urlObject = new URL(url);

      const thumbnail = scrappedThumbnailUrl
        ? generateAssetUrl(urlObject, scrappedThumbnailUrl)
        : undefined;
      const favicon = scrappedFaviconUrl
        ? generateAssetUrl(urlObject, scrappedFaviconUrl)
        : scrapFaviconUrlByUrl(url);
      const domain = urlObject.hostname;
      const publisher = scrappedPublisher ?? scrapPublisherByUrl(url);

      return {
        title: scrappedTitle,
        description: scrappedDescription,
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
  if (assetUrl.startsWith('//')) {
    return `${url.protocol}${assetUrl}`;
  }

  if (assetUrl.startsWith('/')) {
    return `${url.origin}${assetUrl}`;
  }

  return assetUrl;
};

export default htmlService;
