import { Request, Response, NextFunction } from 'express';
import AppError from '../lib/AppError';
import { Session } from '../models/session.model';
import { env } from '../config/env';

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Session.findByIdAndDelete(req.sid);

    res
      .cookie('sid', '', {
        maxAge: 0,
        path: '/',
        domain: 'localhost',
        httpOnly: env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
      .status(200)
      .json({ message: 'Logged out successfully' });
  } catch (error: any) {
    console.error(error);
    return next(new AppError(error.message || 'Internal Server Error', 500));
  }
};

export const logoutAllDevices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    await Session.deleteMany({ user: userId });
    res
      .cookie('sid', '', {
        maxAge: 0,
        path: '/',
        domain: 'localhost',
        httpOnly: env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
      .status(200)
      .json({ message: 'Logged out from all Devices.' });
  } catch (error: any) {
    console.error(error);
    return next(new AppError(error.message || 'Internal Server Error', 500));
  }
};

export const getSessionDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessions = await Session.find({ user: req.user.id }).select(
      'deviceType createdAt'
    );
    res.status(200).send(sessions);
  } catch (error: any) {
    console.error(error);
    return next(new AppError(error.message || 'Internal Server Error', 500));
  }
};
