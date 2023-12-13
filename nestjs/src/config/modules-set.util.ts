import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ApiModule } from '../api/api.module';
import { BackgroundModule } from '../background/background.module';
import { SharedModule } from '../shared/shared.module';
import { AppConfigService } from '../shared/services/app-config.service';

export function generateModulesSet() {
  const imports: ModuleMetadata['imports'] = [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  ];
  let customModules: ModuleMetadata['imports'] = [];

  const dbModule = TypeOrmModule.forRootAsync({
    imports: [SharedModule],
    inject: [AppConfigService],
    useFactory: (config: AppConfigService) =>
      config.postgresConfig as DataSourceOptions,
    dataSourceFactory: (options: DataSourceOptions) => {
      if (!options) {
        throw new Error('Invalid options passed');
      }

      return new DataSource(options).initialize();
    },
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
