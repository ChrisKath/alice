import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { UsersService } from './users.service'
import { UserDto } from './dto/users.dto'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    try {
      const users = await this.usersService.findAll()
      return users.map((user) => plainToClass(UserDto, user))
    } catch (error) {
      throw new HttpException('Unknown `users.findAll`', HttpStatus.FORBIDDEN)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserDto> {
    try {
      const user = await this.usersService.findOne(id)
      return plainToClass(UserDto, user)
    } catch (error) {
      throw new HttpException('Unknown `users.findOne`', HttpStatus.FORBIDDEN)
    }
  }
}
