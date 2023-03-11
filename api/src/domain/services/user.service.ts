import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { USER_REPOSITORY_TOKEN } from '#shared/injection-tokens';
import { UserDto, CreateUserDto } from '#dtos/user';
import { ObjectType } from '#domain/types/types';
import { IUserRepository } from '#interfaces/repositories';
import { IUserService } from '#interfaces/services';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async findOneByParams(
    params: ObjectType,
    withPassword = false,
  ): Promise<UserDto> {
    const user = await this.userRepository.findOneByParams(params);

    if (!user) return null;

    return UserDto.fromEntity(user, withPassword);
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this.userRepository.createOne(dto);

      return UserDto.fromEntity(user);
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('User already exists');
      }

      throw new InternalServerErrorException();
    }
  }
}
