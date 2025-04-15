import { Request, Response, NextFunction } from 'express';
import AppError from '../lib/AppError';

export const getProfileDetails = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, avatar_url, createdAt } = req.user;
    res.status(200).json({
      username,
      email,
      avatar_url,
      createdAt: new Date(createdAt).toLocaleDateString(),
    });
  } catch (error: any) {
    console.error(error);
    return next(new AppError(error.message || 'Internal Server Error', 500));
  }
};
