import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { configs } from '@/constants'
import { LoggerMiddleware } from '@/helpers/logger.middleware'
import { Album, Genre, Track, User } from '@/entities'

import { AppController } from '@/apps/app.controller'
import { StreamModule } from '@/apps/stream/stream.module'
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
      // entities: [`${__dirname}/entities/**/*.entity{.ts,.js}`],
      entities: [Album, Genre, Track, User],
      autoLoadEntities: true,
      synchronize: false,
      logging: ['error', 'warn', 'log']
    }),
    StreamModule,
    UsersModule,
    TracksModule
  ],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
  }
}
