import { CreateCommentDto } from 'dtos/comment/create-comment.dto';

import { IComment } from 'interfaces/schemas/comment.schema.interface';

export interface ICommentService {
  create: (dto: CreateCommentDto) => Promise<IComment>;
}
