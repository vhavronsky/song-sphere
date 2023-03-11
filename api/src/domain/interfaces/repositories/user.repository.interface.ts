import { ObjectType } from '#src/domain/types/types';
import { CreateUserDto } from '#dtos/user';
import { IUser } from '#interfaces/schemas';

export interface IUserRepository {
  findOneByParams: (params: ObjectType) => Promise<IUser | null>;
  createOne: (dto: CreateUserDto) => Promise<IUser>;
}
