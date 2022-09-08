import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { TracksService } from './tracks.service'
import { TrackDocument } from './tracks.entity'
import { CreateTrackDto } from './dto/create-track.dto'

@Controller('tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  async findAll(): Promise<TrackDocument[]> {
    return await this.tracksService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TrackDocument> {
    return await this.tracksService.findOne(id)
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.create(createTrackDto)
  }
}
