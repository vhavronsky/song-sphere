import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  USER_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '#shared/injection-tokens';
import { UserRepository } from '#repositories/user.repository';
import { User, UserSchema } from '#schemas/user.schema';
import { UserService } from '#services/user.service';

const providers: Provider[] = [
  { provide: USER_SERVICE_TOKEN, useClass: UserService },
  { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers,
  exports: providers,
  controllers: [],
})
export class UserModule {}
