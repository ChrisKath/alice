import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configs } from '@/constants'

import { AppController } from '@/apps/app.controller'

// __MODULE's
import { UsersModule } from '@/apps/users/users.module'
import { TracksModule } from '@/apps/tracks/tracks.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [() => configs]
    }),
    TypeOrmModule.forRoot({
      ...configs.database,
      type: 'postgres',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      autoLoadEntities: true,
      synchronize: false,
      logging: ['error', 'warn', 'log']
    })
  ],
  controllers: [AppController]
})
export class AppModule {}
