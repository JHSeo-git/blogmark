import db from '@/lib/prisma';

import type { UpdateUserImageParams } from './user.types';

const userService = {
  async getUserById(userId: string) {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        accounts: true,
        _count: {
          select: {
            items: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    const { _count, createdAt, updatedAt, accounts, ...pickedUser } = user;
    const serialized = {
      ...pickedUser,
      providers: accounts.map((account) => account.provider),
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      itemsCount: _count.items,
    };

    return serialized;
  },

  async updateUserImage({ imageUrl, userId }: UpdateUserImageParams) {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        image: imageUrl,
      },
    });

    return user;
  },
};

export type GetUser = Awaited<ReturnType<typeof userService.getUserById>>;

export default userService;
