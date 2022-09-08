import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { ConfigVariables } from '@/types'

@Controller()
export class AppController {
  constructor(private configService: ConfigService<ConfigVariables>) {}

  @Get()
  async index(): Promise<any> {
    return this.configService.get('database')
  }
}
