import type { Item } from '@prisma/client';

import db from '@/lib/prisma';

import type { CreateItemParam } from './item.types';

const itemService = {
  getItems: async () => {
    const items = await db.item.findMany();

    return items.map(serializeItem);
  },

  createItem: async (data: CreateItemParam) => {
    const item = await db.item.create({
      data: {
        title: data.title,
        description: data.description,
        url: data.url,
        userId: data.userId,
        thumbnail: data.thumbnail,
      },
    });

    return serializeItem(item);
  },
};

const serializeItem = (item: Item) => {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    url: item.url,
    thumbnail: item.thumbnail,
  };
};

export type SerializedItem = ReturnType<typeof serializeItem>;

export default itemService;
