import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { USER_SERVICE_TOKEN } from '#shared/injection-tokens';
import { TokenDto } from '#dtos/token.dto';
import { CreateUserDto, LoginDto } from '#dtos/user';
import { IAuthService } from '#interfaces/services';
import { UserService } from '#services/user.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_SERVICE_TOKEN)
    private readonly userService: UserService,
  ) {}

  async signUp(dto: CreateUserDto): Promise<TokenDto> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return TokenDto.format(token);
  }

  async login(dto: LoginDto): Promise<TokenDto> {
    const { email, password } = dto;

    const user = await this.userService.findOneByParams({ email }, true);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid password');

    const token = this.jwtService.sign({ id: user._id });

    return TokenDto.format(token);
  }
}
