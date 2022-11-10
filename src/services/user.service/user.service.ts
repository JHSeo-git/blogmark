import db from '@/lib/prisma';

import type { UpdateUserImageParams } from './user.types';

const userService = {
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

export default userService;
