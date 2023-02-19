import { Module, Provider } from '@nestjs/common';

import { FileService } from 'src/domain/services/file.service';

import { FILE_SERVICE_TOKEN } from 'src/shared/injection-tokens';

const providers: Provider[] = [
  { provide: FILE_SERVICE_TOKEN, useClass: FileService },
];

@Module({
  imports: [],
  controllers: [],
  providers,
  exports: providers,
})
export class FileModule {}
