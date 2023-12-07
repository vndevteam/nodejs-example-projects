import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppLoggerMiddleware } from './common/middleware/logger.middleware';
import { Logger } from 'winston';
import { generateModulesSet } from './config/modules-set.util';

@Module({
  imports: generateModulesSet(),
  controllers: [],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
