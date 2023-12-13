import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { newInstance } from './config/winston.logger';
import { SharedModule } from './shared/shared.module';
import { AppConfigService } from './shared/services/app-config.service';

/**
 * Asynchronous function to bootstrap the NestJS application.
 * - Creates an instance of the AppModule.
 * - Retrieves the ConfigService for environment configuration.
 * - Sets up logging for errors and warnings in production.
 * - Applies global interceptors, exception filters, and validation pipes.
 * - Start listening on port that is specified in the environment configuration
 */
async function bootstrap() {
  // Create an instance of the NestJS application
  const app = await NestFactory.create(AppModule);

  // Retrieve the ConfigService for environment configuration
  const configService = app.select(SharedModule).get(AppConfigService);

  // Set up logging for errors and warnings in production
  if (configService.isProduction) {
    app.useLogger(
      WinstonModule.createLogger({
        instance: newInstance(configService.appConfig.logLevel),
      }),
    );
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

  // Start listening on port that is specified in the environment configuration
  await app.listen(configService.appConfig.port);

  console.info(`Server running on ${await app.getUrl()}`);
}

// Call the bootstrap function to initialize the application
void bootstrap();
