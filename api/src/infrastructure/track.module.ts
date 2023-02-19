import { MongooseModule } from '@nestjs/mongoose';
import { Module, Provider } from '@nestjs/common';

import { TRACK_SERVICE_TOKEN } from 'src/shared/injection-tokens';

import { TrackController } from 'controllers/track.controller';
import { TrackService } from 'services/track.service';
import { Track, TrackSchema } from 'domain/schemas';

import { FileModule } from './file.module';

const providers: Provider[] = [
  { provide: TRACK_SERVICE_TOKEN, useClass: TrackService },
];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    FileModule,
  ],
  controllers: [TrackController],
  providers,
  exports: providers,
})
export class TrackModule {}
