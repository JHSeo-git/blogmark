import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { isAppError } from '../error';

export function withCatch(handler: NextApiHandler) {
  return async function catchMiddleware(req: NextApiRequest, res: NextApiResponse) {
    try {
      return await handler(req, res);
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        res.status(422).json({ message: error.message });
      }

      if (isAppError(error)) {
        res.status(error.statusCode).json({ message: error.message });
      }

      return res.status(500).end();
    }
  };
}
