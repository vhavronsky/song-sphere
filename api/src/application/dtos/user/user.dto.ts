import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

import { User } from '#schemas/user.schema';

export class UserDto {
  @ApiProperty()
  readonly _id: ObjectId;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @MinLength(6)
  readonly password?: string;

  static fromEntity(entity: User, withPassword = false): UserDto {
    const it = new UserDto();
    const { _id, username, name, email, password } = entity;

    return {
      ...it,
      _id,
      username,
      name,
      email,
      ...(withPassword ? { password } : {}),
    };
  }

  static toEntity(dto: UserDto): User {
    const it = new User();
    const { _id, username, name, email, password } = dto;

    return {
      ...it,
      _id,
      username,
      name,
      email,
      password,
    };
  }
}
