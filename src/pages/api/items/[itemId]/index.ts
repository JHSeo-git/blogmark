import type { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { withCatch } from '@/lib/api-middlewares/with-catch';
import { withMethods } from '@/lib/api-middlewares/with-methods';
import { authOptions } from '@/lib/next-auth';
import { itemIdSchema } from '@/lib/validations/item';
import itemService from '@/services/item.service';

const itemIndexHandler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method === 'DELETE') {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(403).end();
    }

    const params = await itemIdSchema.parseAsync(req.query);

    await itemService.deleteItem({
      userId: session.user.id,
      itemId: params.itemId,
    });

    return res.status(204).end();
  }
};

export default withCatch(withMethods(['DELETE'], itemIndexHandler));
