import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { isAppError } from '../error';

export function withCatch(handler: NextApiHandler) {
  return async function catchMiddleware(req: NextApiRequest, res: NextApiResponse) {
    try {
      return await handler(req, res);
    } catch (error) {
      console.error(error);

      if (error instanceof yup.ValidationError) {
        res.status(422).json({ message: error.message });
      }

      if (isAppError(error)) {
        res.status(error.statusCode).json({ message: error.message });
      }

      return res.status(500).end();
    }
  };
}
