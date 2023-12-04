import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ENV_KEYS, NODE_ENV } from './common/constants/constant';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const isProduction =
    configService.get(ENV_KEYS.NODE_ENV) === NODE_ENV.PRODUCTION;
  if (isProduction) {
    app.useLogger(['error', 'warn']);
  }
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
