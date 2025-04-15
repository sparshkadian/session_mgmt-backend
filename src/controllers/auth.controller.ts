import { NextFunction, Request, Response } from 'express';
import { IUser, User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { Session } from '../models/session.model';
import AppError from '../lib/AppError';
import { getIP, getDeviceDetails } from '../lib/getDeviceDetails';
import { env } from '../config/env';

function sendResponse(res: Response, sessionId: string, newUser: boolean) {
  if (newUser) {
    res
      .cookie('sid', sessionId, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: 'user created successfully' });
  } else {
    res
      .cookie('sid', sessionId, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: 'Login Successful' });
  }
}

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.create(req.body);
    const session = await Session.create({
      user,
      Ip: getIP(req),
      deviceType: getDeviceDetails(req),
    });

    sendResponse(res, session.id, true);
  } catch (error: any) {
    console.error(error);
    return next(new AppError(error.message || 'Internal Server Error', 500));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError('No user found with this email', 404));
    }

    const comparePasswords = await bcrypt.compare(password, user.password);
    if (!comparePasswords) {
      return next(new AppError('Invalid Credentials', 404));
    }

    const sessionCount: (typeof Session)[] = await Session.find({
      user: user.id,
    });

    if (sessionCount.length === 3) {
      return next(
        new AppError(
          'Max Sessions Reached. Log out from a device to continue',
          429
        )
      );
    }

    const session = await Session.create({
      user: user.id,
      Ip: getIP(req),
      deviceType: getDeviceDetails(req),
    });
    sendResponse(res, session.id, false);
  } catch (error: any) {
    console.error(error);
    return next(new AppError(error.message || 'Internal Server Error', 500));
  }
};
