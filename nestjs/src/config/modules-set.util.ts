import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import configuration from './configuration';
import { dataSourceFactory } from './data-source';
import { ApiModule } from '../api/api.module';
import { BackgroundModule } from '../background/background.module';

export function generateModulesSet() {
  const imports: ModuleMetadata['imports'] = [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
  ];
  let customModules: ModuleMetadata['imports'] = [];

  const dbModule = TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return config.get('database') as DataSourceOptions;
    },
    dataSourceFactory: dataSourceFactory,
  });

  const modulesSet = process.env.MODULES_SET || 'monolith';

  switch (modulesSet) {
    case 'monolith':
      customModules = [ApiModule, BackgroundModule, dbModule];
      break;
    case 'api':
      customModules = [ApiModule, dbModule];
      break;
    case 'background':
      customModules = [BackgroundModule];
      break;
    default:
      console.error(`Unsupported modules set: ${modulesSet}`);
      break;
  }

  return imports.concat(customModules);
}
