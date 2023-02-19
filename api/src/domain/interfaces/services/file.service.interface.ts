import { FileType } from '#types/enums';

export interface IFileService {
  createFile: (type: FileType, file: Express.Multer.File) => string;
}
