import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TracksController } from './tracks.controller'
import { Track } from './tracks.entity'
import { TracksService } from './tracks.service'

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService]
})
export class TracksModule {}
