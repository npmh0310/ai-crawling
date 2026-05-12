import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const basePort = Number(process.env.PORT ?? 3009);
  const maxAttempts = 10;

  for (let i = 0; i < maxAttempts; i += 1) {
    const port = basePort + i;
    try {
      await app.listen(port, '0.0.0.0');
      console.log(`Backend running on http://localhost:${port}`);
      return;
    } catch (error: any) {
      if (error?.code !== 'EADDRINUSE' || i === maxAttempts - 1) {
        throw error;
      }
    }
  }
}

bootstrap();
