import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entities/user.entity'
import { UserDto } from './dto/users.dto'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private users: Repository<UserEntity>) {}

  async findAll(): Promise<UserDto[]> {
    return await this.users.createQueryBuilder('user').getMany()
  }

  async findOne(id: number): Promise<UserDto> {
    return await this.users.createQueryBuilder('user').where('user.id = :id', { id }).getOne()
  }
}
