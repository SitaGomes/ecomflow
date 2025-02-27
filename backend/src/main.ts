import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3333);
}
bootstrap()
  .then(() => {
    console.log('Server running at http://localhost:3333');
  })
  .catch((err) => {
    console.error('Error starting server', err);
  });
