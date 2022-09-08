import { Expose } from 'class-transformer'
import { IsDate } from 'class-validator'

export class BaseDto {
  constructor(data?: BaseDto) {
    Object.assign(this, data)
  }

  @Expose()
  @IsDate()
  updatedAt: Date

  @Expose()
  @IsDate()
  createdAt: Date
}
