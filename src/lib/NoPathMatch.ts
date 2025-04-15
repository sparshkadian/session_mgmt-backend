import { NextFunction, Request, Response } from 'express';
import AppError from './AppError';

function noRouteMatch(req: Request, res: Response, next: NextFunction) {
  return next(
    new AppError(`Path ${req.originalUrl} does not exist on this server`, 404)
  );
}

export default noRouteMatch;
