import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User, UserDocument } from './users.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<UserDocument>) {}

  public findAll(): Promise<UserDocument[]> {
    return this.usersRepo.createQueryBuilder().getMany()
  }

  public findOne(id: number): Promise<UserDocument> {
    return this.usersRepo.createQueryBuilder('user').where('user.id = :id', { id }).getOne()
  }
}
