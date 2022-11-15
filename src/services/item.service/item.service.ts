import type { Blog, Item, User } from '@prisma/client';

import db from '@/lib/prisma';
import { uploadImage } from '@/lib/r2';
import { getDate, slugify } from '@/lib/utils';

import type { CreateItemParam, GetItemsParams, GetPaginationItemsParams } from './item.types';

const DEFAULT_PAGINATION_LIMIT = 12;

const itemService = {
  async getItems({ cursor, limit = DEFAULT_PAGINATION_LIMIT }: GetItemsParams = {}) {
    const itemsWithNext = await db.item.findMany({
      include: {
        user: true,
        blog: true,
      },
      orderBy: {
        id: 'desc',
      },
      cursor: cursor ? { id: cursor } : undefined,
      take: limit + 1,
    });

    const items = itemsWithNext.slice(0, limit);

    const nextCursor = itemsWithNext[limit] ? itemsWithNext[limit].id : null;

    const serializeItems = items.map(serializeItem);

    return {
      items: serializeItems,
      pageInfo: {
        nextCursor,
      },
    };
  },

  async getPaginationItems({
    page = 1,
    limit = DEFAULT_PAGINATION_LIMIT,
  }: GetPaginationItemsParams = {}) {
    const [total, items] = await Promise.all([
      db.item.count(),
      db.item.findMany({
        include: {
          user: true,
          blog: true,
        },
        orderBy: {
          id: 'desc',
        },
        take: limit,
        skip: limit * (page - 1),
      }),
    ]);

    return {
      items: items.map(serializeItem),
      pageInfo: {
        currentPage: page,
        nextPage: total > page * limit ? page + 1 : null,
        total,
      },
    };
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

    const calendarDate = getDate(new Date());
    const item = await db.item.create({
      data: {
        userId: data.userId,
        blogId: data.blogId,
        slug,
        title: data.title,
        description: data.description,
        url: data.url,
        thumbnail: data.thumbnail,
        calendarDate,
      },
      include: {
        user: true,
        blog: true,
      },
    });

    const createdDate = getDate(item.createdAt);
    if (calendarDate !== createdDate) {
      await db.item.update({
        where: {
          id: item.id,
        },
        data: {
          calendarDate: createdDate,
        },
      });
    }

    if (data.thumbnail) {
      const thumbnailUrl = await uploadImage({
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
    calendarDate: item.calendarDate,
    createdAt: item.createdAt.toISOString(),
  };
};

export type SerializedItem = ReturnType<typeof serializeItem>;

export default itemService;
