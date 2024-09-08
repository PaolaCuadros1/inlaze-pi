import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const apiPath = 'api/v1'
  app.setGlobalPrefix(apiPath);

  // Swagger Options
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentación API prueba Paola Cuadros')
    .setDescription('Esta es la documentación creada para la Prueba Técnica Full-Stack')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${apiPath}/docs`, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  await app.listen(3000);
}
bootstrap();
