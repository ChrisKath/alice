import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app'
import { port } from '@/constants/configs'
import morgan from 'morgan'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(morgan('dev'))
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
    maxAge: 3600
  })

  await app.listen(port)
}

bootstrap()
