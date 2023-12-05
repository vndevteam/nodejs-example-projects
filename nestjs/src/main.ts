import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ENV_KEYS, NODE_ENV } from './common/constants/constant';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

/**
 * Asynchronous function to bootstrap the NestJS application.
 * - Creates an instance of the AppModule.
 * - Retrieves the ConfigService for environment configuration.
 * - Sets up logging for errors and warnings in production.
 * - Applies global interceptors, exception filters, and validation pipes.
 * - Listens on port 3000 for incoming requests.
 */
async function bootstrap() {
  // Create an instance of the NestJS application
  const app = await NestFactory.create(AppModule);

  // Retrieve the ConfigService for environment configuration
  const configService = app.get<ConfigService>(ConfigService);

  // Check if the application is running in production environment
  const isProduction =
    configService.get(ENV_KEYS.NODE_ENV) === NODE_ENV.PRODUCTION;

  // Set up logging for errors and warnings in production
  if (isProduction) {
    app.useLogger(['error', 'warn']);
  }

  // Apply global interceptors
  app.useGlobalInterceptors(new TransformInterceptor());

  // Apply global exception filters
  app.useGlobalFilters(new AllExceptionFilter());

  // Apply global validation pipes with whitelisting and custom exception handling
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  // Start listening on port 3000
  await app.listen(3000);
}

// Call the bootstrap function to initialize the application
bootstrap();
