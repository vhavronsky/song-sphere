import { CreateCommentDto } from 'src/application/dtos/comment/create-comment.dto';

import { IComment } from 'src/domain/interfaces/schemas/comment.schema.interface';

export interface ICommentService {
  create: (dto: CreateCommentDto) => Promise<IComment>;
}
