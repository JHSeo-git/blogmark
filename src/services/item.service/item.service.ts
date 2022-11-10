import type { Blog, Item, User } from '@prisma/client';

import db from '@/lib/prisma';
import { getDate, slugify } from '@/lib/utils';

import imageService from '../image.service';
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
    let slug = slugify(data.title);

    const alreadyExists = await db.item.findUnique({
      where: {
        slug,
      },
    });

    if (alreadyExists) {
      slug = `${slug}-${Date.now()}`;
    }

    const item = await db.item.create({
      data: {
        userId: data.userId,
        blogId: data.blogId,
        slug,
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

    if (data.thumbnail) {
      const thumbnailUrl = await imageService.upload({
        id: item.id,
        imageUrl: data.thumbnail,
        type: 'thumbnail',
      });

      await db.item.update({
        where: {
          id: item.id,
        },
        data: {
          thumbnail: thumbnailUrl,
        },
      });
    }

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
    createdDate: getDate(item.createdAt),
    createdAt: item.createdAt.toISOString(),
  };
};

export type SerializedItem = ReturnType<typeof serializeItem>;

export default itemService;
