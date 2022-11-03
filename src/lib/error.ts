export const errorMap = {
  BadRequest: {
    message: 'Bad Request',
    statusCode: 400,
  },
  URLBadRequest: {
    message: 'URL is not valid',
    statusCode: 400,
  },
  Unauthorized: {
    message: 'Unauthorized',
    statusCode: 401,
  },
  NotAuthenticated: {
    message: 'Invalid email or password',
    statusCode: 401,
  },
  ExpiredToken: {
    message: 'Token is expired',
    statusCode: 401,
  },
  InvalidToken: {
    message: 'Token is invalid',
    statusCode: 401,
  },
  BlockedSession: {
    message: 'Session is blocked',
    statusCode: 401,
  },
  Forbidden: {
    message: 'Forbidden',
    statusCode: 403,
  },
  NotFound: {
    message: 'Not Found',
    statusCode: 404,
  },
  NotAcceptable: {
    message: 'Not Acceptable',
    statusCode: 406,
  },
  Conflict: {
    message: 'Conflict',
    statusCode: 409,
  },
  AlreadyExists: {
    message: 'Already Exists',
    statusCode: 409,
  },
  SSLCertificateError: {
    message: 'Error the URL page SSL Certificate',
    statusCode: 495,
  },
  InternalServer: {
    message: 'Internal Server Error',
    statusCode: 500,
  },
} as const;

export type AppErrorName = keyof typeof errorMap;
export type AppHttpStatusCode = typeof errorMap[AppErrorName]['statusCode'];

class AppError extends Error {
  public statusCode: number;

  constructor(name: AppErrorName) {
    const info = errorMap[name];

    super(info.message);

    this.name = name;
    this.statusCode = info.statusCode;
  }
}

interface CodeError extends Error {
  code?: string;
}

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

export const isCodeError = (error: unknown): error is CodeError => {
  return error instanceof Error && Boolean((error as CodeError).code);
};

export default AppError;
