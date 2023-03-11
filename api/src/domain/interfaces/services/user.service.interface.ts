import { UserDto, CreateUserDto } from '#dtos/user';
import { ObjectType } from '#domain/types/types';

export interface IUserService {
  findOneByParams(params: ObjectType): Promise<UserDto>;
  create(dto: CreateUserDto): Promise<UserDto>;
}
