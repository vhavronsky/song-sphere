import { Module, Provider } from '@nestjs/common';

import { FILE_SERVICE_TOKEN } from 'shared/injection-tokens';

import { FileService } from 'services/file.service';

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
