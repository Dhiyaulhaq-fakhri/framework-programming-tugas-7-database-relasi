import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Fungsi utama untuk menjalankan dan mengatur konfigurasi aplikasi.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Mengatur validasi data yang masuk berdasarkan aturan DTO.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // buang field yang tidak ada di DTO
      forbidNonWhitelisted: true, // error kalau ada field asing
      transform: true,          // auto-convert tipe (string → number, dll)
    }),
  );

  // Menerapkan interceptor dan filter secara global.
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('Dokumentasi API untuk UTS Framework Programming')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // nanti diakses di /api-docs

  // Menentukan port server dan menjalankan aplikasi.
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();