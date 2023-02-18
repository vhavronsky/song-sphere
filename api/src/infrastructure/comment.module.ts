import { MongooseModule } from '@nestjs/mongoose';
import { Module, Provider } from '@nestjs/common';

import { CommentController } from '../application/controllers/comment.controller';
import { CommentService } from '../domain/services/comment.service';
import { Track, TrackSchema } from '../domain/schemas/track.schema';
import { Comment, CommentSchema } from '../domain/schemas/comment.schema';
import {
  COMMENT_SERVICE_TOKEN,
  TRACK_SERVICE_TOKEN,
} from 'src/shared/injection-tokens';
import { TrackService } from 'src/domain/services/track.service';

const providers: Provider[] = [
  { provide: COMMENT_SERVICE_TOKEN, useClass: CommentService },
  { provide: TRACK_SERVICE_TOKEN, useClass: TrackService },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Track.name, schema: TrackSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [CommentController],
  providers,
})
export class CommentModule {}
