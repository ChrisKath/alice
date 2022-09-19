import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TracksService } from '@/apps/tracks/tracks.service'
import { StreamController } from './stream.controller'
import { Track } from '@/entities'

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [StreamController],
  providers: [TracksService],
  exports: [TypeOrmModule]
})
export class StreamModule {}
