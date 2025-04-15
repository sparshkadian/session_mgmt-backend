import mongoose, { Schema, Types } from 'mongoose';
import { User } from './user.model';

interface ISession extends Document {
  user: typeof User;
  Ip: string;
  deviceType: string;
  createdAt: Date;
  updatedAt: Date;
}

const session = new mongoose.Schema<ISession>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    Ip: {
      type: Schema.Types.String,
      required: true,
    },
    deviceType: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Session = mongoose.model('Session', session);
