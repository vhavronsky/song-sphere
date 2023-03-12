import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AUTH_SERVICE_TOKEN } from '#shared/injection-tokens';
import { TokenDto } from '#dtos/token.dto';
import { CreateUserDto, LoginDto } from '#dtos/user';
import { IAuthService } from '#interfaces/services';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
  ) {}

  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: HttpStatus.OK, type: TokenDto })
  @HttpCode(HttpStatus.OK)
  signUp(@Body() dto: CreateUserDto): Promise<TokenDto> {
    return this.authService.signUp(dto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: HttpStatus.OK, type: TokenDto })
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto): Promise<TokenDto> {
    return this.authService.login(dto);
  }
}
