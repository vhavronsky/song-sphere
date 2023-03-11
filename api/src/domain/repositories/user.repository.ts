import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from '#dtos/user';
import { ObjectType } from '#domain/types/types';
import { IUserRepository } from '#interfaces/repositories';
import { IUser } from '#interfaces/schemas';
import { User, UserDocument } from '#schemas/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findOneByParams(params: ObjectType): Promise<IUser | null> {
    return this.userModel.findOne(params);
  }

  async createOne(dto: CreateUserDto): Promise<IUser> {
    return this.userModel.create(dto);
  }
}
