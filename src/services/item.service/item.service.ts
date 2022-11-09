import type { Blog, Item, User } from '@prisma/client';

import db from '@/lib/prisma';
import { getDateString, slugify } from '@/lib/utils';

import type { CreateItemParam } from './item.types';

const itemService = {
  async getItems() {
    const items = await db.item.findMany({
      include: {
        user: true,
        blog: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    return items.map(serializeItem);
  },

  async createItem(data: CreateItemParam) {
    const item = await db.item.create({
      data: {
        userId: data.userId,
        blogId: data.blogId,
        slug: slugify(data.title),
        title: data.title,
        description: data.description,
        url: data.url,
        thumbnail: data.thumbnail,
      },
      include: {
        user: true,
        blog: true,
      },
    });

    return serializeItem(item);
  },
};

const serializeItem = (item: Item & { user: User; blog: Blog }) => {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    url: item.url,
    thumbnail: item.thumbnail,
    favicon: item.blog.favicon,
    publisher: item.blog.name,
    userName: item.user.name,
    createDate: getDateString(item.createdAt),
  };
};

export type SerializedItem = ReturnType<typeof serializeItem>;

export default itemService;
