import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Track, TrackDocument } from './tracks.entity'
import { CreateTrackDto } from './dto/create-track.dto'

@Injectable()
export class TracksService {
  constructor(@InjectRepository(Track) private tractsRepo: Repository<TrackDocument>) {}

  async findAll(): Promise<TrackDocument[]> {
    return this.tractsRepo.createQueryBuilder().getMany()
  }

  async findOne(id: string): Promise<TrackDocument> {
    return this.tractsRepo.createQueryBuilder('track').where('track.id = :id', { id }).getOne()
  }

  async create(track: CreateTrackDto): Promise<Track> {
    return this.tractsRepo.save(track)
  }
}
