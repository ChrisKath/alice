import { Expose } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'
import { BaseDto } from '@/helpers/base.dto'

@Expose()
export class UserDto extends BaseDto {
  constructor(user: UserDto) {
    super(user)
    Object.assign(this, user)
  }

  @Expose()
  @IsNumber()
  id!: number

  @Expose()
  @IsString()
  displayName!: string
}
