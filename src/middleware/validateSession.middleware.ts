import { NextFunction, Request, Response } from 'express';
import AppError from '../lib/AppError';
import { User } from '../models/user.model';
import { Session } from '../models/session.model';
import parseCookies from '../lib/parseCookies';

async function validateSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookies = parseCookies(req.headers.cookie);
    const sid = cookies['sid'];

    if (!sid) {
      return next(new AppError('Session Id not present or expired', 401));
    }

    const session = await Session.findOne({ _id: sid });
    if (!session) {
      return next(new AppError('Invalid Session id', 404));
    }

    const user = await User.findOne({ _id: session.user }).select('-password');
    if (!user) {
      return next(new AppError('Invalid Session id', 404));
    }

    req.user = user;
    req.sid = sid;
    next();
  } catch (error: any) {
    console.log(error);
    return next(new AppError(error.message || 'Internal Server Error', 500));
  }
}

export default validateSession;
