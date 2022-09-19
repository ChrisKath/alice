import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Track } from '@/entities'

@Injectable()
export class TracksService {
  constructor(@InjectRepository(Track) private tracks: Repository<Track>) {}

  async findAll() {
    return this.tracks.createQueryBuilder('track').getMany()
  }

  async findOne(id: string) {
    return this.tracks.createQueryBuilder('track').where('track.id = :id', { id }).getOne()
  }
}
