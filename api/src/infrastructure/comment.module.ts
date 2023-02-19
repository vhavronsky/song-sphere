import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentController } from '#controllers/comment.controller';

import { COMMENT_SERVICE_TOKEN } from '#shared/injection-tokens';
import { Comment, Track, CommentSchema, TrackSchema } from '#domain/schemas';
import { CommentService } from '#services/comment.service';

import { TrackModule } from './track.module';

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
