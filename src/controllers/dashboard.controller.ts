import { NextFunction, Request, Response } from 'express';
import AppError from '../lib/AppError';

export const getDashboardDetails = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error: any) {
    console.error(error);
    return next(new AppError(error.message || 'Internal Server Error', 500));
  }
};
