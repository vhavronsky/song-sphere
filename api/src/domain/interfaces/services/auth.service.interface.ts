import { TokenDto } from '#dtos/token.dto';
import { CreateUserDto, LoginDto } from '#dtos/user';

export interface IAuthService {
  signUp(dto: CreateUserDto): Promise<TokenDto>;
  login(dto: LoginDto): Promise<TokenDto>;
}
