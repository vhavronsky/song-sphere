import { TrackModule } from './track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, Provider } from '@nestjs/common';

import { CommentController } from '../application/controllers/comment.controller';
import { CommentService } from '../domain/services/comment.service';
import { Track, TrackSchema } from '../domain/schemas/track.schema';
import { Comment, CommentSchema } from '../domain/schemas/comment.schema';
import { COMMENT_SERVICE_TOKEN } from 'src/shared/injection-tokens';

const providers: Provider[] = [
  { provide: COMMENT_SERVICE_TOKEN, useClass: CommentService },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Track.name, schema: TrackSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    TrackModule,
  ],
  controllers: [CommentController],
  providers,
})
export class CommentModule {}
