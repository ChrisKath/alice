import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { TracksService } from './tracks.service'

@Controller('tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  async findAll() {
    try {
      const tracks = await this.tracksService.findAll()
      return tracks
    } catch (error) {
      throw new HttpException('Unknown `tracks.findAll`', HttpStatus.FORBIDDEN)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const track = await this.tracksService.findOne(id)
      return track
    } catch (error) {
      throw new HttpException('Unknown `tracks.findOne`', HttpStatus.FORBIDDEN)
    }
  }
}
