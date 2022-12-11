import type { Blog, Item, Like, User } from '@prisma/client';

import db from '@/lib/prisma';
import { uploadImage } from '@/lib/r2';
import { getDate, slugify } from '@/lib/utils';

import type {
  CreateItemParam,
  GetItemsByCursorParams,
  GetItemsParams,
  LikeItemParam,
} from './item.types';

const DEFAULT_PAGINATION_LIMIT = 12;

const itemService = {
  async getItems({ page = 1, limit = DEFAULT_PAGINATION_LIMIT, userId }: GetItemsParams = {}) {
    const [total, items] = await Promise.all([
      db.item.count(),
      db.item.findMany({
        include: {
          user: true,
          blog: true,
          likes: true,
        },
        orderBy: {
          id: 'desc',
        },
        take: limit,
        skip: limit * (page - 1),
      }),
    ]);

    return {
      items: items.map((item) => serializeItem(item, userId)),
      pageInfo: {
        currentPage: page,
        nextPage: total > page * limit ? page + 1 : undefined,
        total,
      },
    };
  },

  async getItemsByCursor({
    cursor,
    limit = DEFAULT_PAGINATION_LIMIT,
    userId,
  }: GetItemsByCursorParams = {}) {
    const [total, itemsWithNext] = await Promise.all([
      db.item.count(),
      db.item.findMany({
        include: {
          user: true,
          blog: true,
          likes: true,
        },
        orderBy: {
          id: 'desc',
        },
        cursor: cursor ? { id: cursor } : undefined,
        take: limit + 1,
      }),
    ]);

    const items = itemsWithNext.slice(0, limit);

    const nextCursor = itemsWithNext[limit] ? itemsWithNext[limit].id : null;

    const serializeItems = items.map((item) => serializeItem(item, userId));

    return {
      items: serializeItems,
      pageInfo: {
        nextCursor,
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
        likes: true,
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

    return serializeItem(item, data.userId);
  },

  async likeItem({ userId, itemId }: LikeItemParam) {
    const alreadyLikeItem = await db.like.findUnique({
      where: {
        userId_itemId: {
          itemId,
          userId,
        },
      },
    });

    if (!alreadyLikeItem) {
      await db.like.create({
        data: {
          userId,
          itemId,
        },
      });
    }

    const likes = await db.like.count({
      where: {
        itemId,
      },
    });

    return {
      likes,
    };
  },

  async deleteLikeItem({ userId, itemId }: LikeItemParam) {
    const existLikeItem = await db.like.findUnique({
      where: {
        userId_itemId: {
          itemId,
          userId,
        },
      },
    });

    if (existLikeItem) {
      await db.like.delete({
        where: {
          userId_itemId: {
            itemId,
            userId,
          },
        },
      });
    }

    const likes = await db.like.count({
      where: {
        itemId,
      },
    });

    return {
      likes,
    };
  },
};

const serializeItem = (
  item: Item & { user: User; blog: Blog; likes: Like[] },
  sessionUserId?: string,
) => {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    url: item.url,
    thumbnail: item.thumbnail,
    favicon: item.blog.favicon,
    publisher: item.blog.name,
    publisherUrl: item.blog.domain,
    userName: item.user.name,
    likes: item.likes.length,
    isLike: item.likes.some((like) => like.userId === sessionUserId),
    calendarDate: item.calendarDate,
    createdAt: item.createdAt.toISOString(),
  };
};

export type GetItemsByCursor = Awaited<ReturnType<typeof itemService.getItemsByCursor>>;
export type GetItems = Awaited<ReturnType<typeof itemService.getItems>>;
export type SerializedItem = ReturnType<typeof serializeItem>;

export default itemService;
