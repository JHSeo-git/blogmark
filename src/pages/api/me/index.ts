import type { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import { withCatch } from '@/lib/api-middlewares/with-catch';
import { withMethods } from '@/lib/api-middlewares/with-methods';
import { authOptions } from '@/lib/next-auth';
import { userSchema } from '@/lib/validations/user';
import userService from '@/services/user.service';

const userIndexHandler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(403).end();
    }

    const data = await userService.getUserById(session.user.id);

    return res.status(200).json(data);
  }

  if (method === 'PUT') {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(403).end();
    }

    const body = await userSchema.parseAsync(req.body);

    const data = await userService.updateUserInfo({
      userId: session.user.id,
      userName: body.userName,
    });

    if (!data) {
      return res.status(404).end();
    }

    return res.status(204).end();
  }
};

export default withCatch(withMethods(['GET', 'PUT'], userIndexHandler));
