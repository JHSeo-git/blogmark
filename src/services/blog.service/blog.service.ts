import db from '@/lib/prisma';

interface GetBlogByUrlParams {
  url: string;
  favicon?: string;
  publisher?: string;
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
      const updated = await db.blog.update({
        where: {
          id: blog.id,
        },
        data: {
          favicon,
          name: publisher ?? domain,
        },
      });

      return updated;
    }

    const createdBlog = await db.blog.create({
      data: {
        domain,
        name: publisher ?? domain,
        favicon,
      },
    });

    return createdBlog;
  },
};

export default blogService;
