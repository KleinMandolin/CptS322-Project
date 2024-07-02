import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as fs from 'node:fs';
import * as path from 'path';

async function bootstrap() {
  /*const httpsOptions = {
    key: fs.readFileSync(
      path.join(__dirname, '..', 'httpsCertKey', 'server.key'),
    ),
    cert: fs.readFileSync(
      path.join(__dirname, '..', 'httpsCertKey', 'server.cert'),
    ),
  };*/

  const app = await NestFactory.create(AppModule, {
    /*httpsOptions,*/
  });
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Content-Type, Accept, Authorization, X-Requested-With, Origin',
  });

  app.use(cookieParser());
  // Validation pipe validates input against existing data transfer objects. If data does not match
  // criteria defined in DTOs, then the pipe responds with a '400 bad request' error.
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
