import mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.ObjectId;

  name: string;

  username: string;

  email: string;

  password: string;
}
