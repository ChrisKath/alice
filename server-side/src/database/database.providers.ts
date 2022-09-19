import { DataSource } from 'typeorm'
import { configs } from '@/constants'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        ...configs.database,
        type: 'postgres',
        entities: [`${__dirname}/../entities/**/*.entity{.ts,.js}`],

        synchronize: false,
        logging: ['error', 'warn', 'log']
      })

      return dataSource.initialize()
    }
  }
]
