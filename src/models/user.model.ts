import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar_url: string;
  createdAt: Date;
  updatedAt: Date;
}

const user = new mongoose.Schema<IUser>(
  {
    username: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: [true, 'Email Already in Use'],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (val: string): boolean {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid Email Address`,
      },
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    avatar_url: {
      type: Schema.Types.String,
      default: 'https://cdn-icons-png.flaticon.com/128/2202/2202112.png',
      required: false,
    },
  },
  { timestamps: true }
);

user.pre<IUser>('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

export const User = mongoose.model('User', user);
