import db from '@/lib/prisma';

import imageService from '../image.service';

interface GetBlogByUrlParams {
  url: string;
  publisher: string;
  favicon?: string;
}

const blogService = {
  async getBlogByUrl({ url, favicon, publisher }: GetBlogByUrlParams) {
    const urlObject = new URL(url);
    const domain = urlObject.hostname;

    const blog = await db.blog.findUnique({
      where: {
        domain,
      },
    });

    if (blog) {
      return blog;
    }

    const createdBlog = await db.blog.create({
      data: {
        domain,
        name: publisher,
        favicon,
      },
    });

    if (favicon) {
      const faviconUrl = await imageService.upload({
        id: createdBlog.id,
        imageUrl: favicon,
        type: 'favicon',
      });

      await db.blog.update({
        where: {
          id: createdBlog.id,
        },
        data: {
          favicon: faviconUrl,
        },
      });
    }

    return createdBlog;
  },
};

export default blogService;
