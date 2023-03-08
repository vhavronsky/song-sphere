import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { IUser } from '#interfaces/schemas';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements IUser {
  _id: mongoose.ObjectId;

  @Prop()
  name: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
