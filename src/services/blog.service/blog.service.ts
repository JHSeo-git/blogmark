import db from '@/lib/prisma';
import { uploadImage } from '@/lib/r2';

interface GetBlogByUrlParams {
  url: string;
  publisher: string;
  favicon?: string;
}

const blogService = {
  async getBlog({ url, favicon, publisher }: GetBlogByUrlParams) {
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
      const faviconUrl = await uploadImage({
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
