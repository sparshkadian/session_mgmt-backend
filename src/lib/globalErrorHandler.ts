import { ErrorRequestHandler, Response } from 'express';
import { env } from '../config/env';

const sendDevError = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || 'something went wrong',
    error: err,
    stack: err.stack,
  });
};

function sendProdError(err: any, res: Response) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || 'something went wrong',
  });
}

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (env.NODE_ENV === 'development') {
    sendDevError(err, res);
  }

  if (env.NODE_ENV === 'production') {
    sendProdError(err, res);
  }
};

export default globalErrorHandler;
