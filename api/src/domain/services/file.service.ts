import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';

import { FileType } from 'types/enums';
import { IFileService } from 'interfaces/services/file.service.interface';

@Injectable()
export class FileService implements IFileService {
  createFile(type: FileType, file: Express.Multer.File): string {
    const dirPath = path.resolve(__dirname, '..', '..', 'static', type);
    const { originalname, buffer } = file;

    const fileExtension = originalname.split('.').pop();
    const fileName = uuid.v4() + '.' + fileExtension;
    const filePath = path.resolve(dirPath, fileName);

    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    fs.writeFileSync(filePath, buffer);

    return type + '/' + fileName;
  }

  //   removeFile(fileName: string) {}
}
