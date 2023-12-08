import { DataSource, DataSourceOptions } from 'typeorm';

export const makeDataSourceOptions = (): DataSourceOptions => {
  const dataSource: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST ?? '__DATABASE_HOST__',
    port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
    username: process.env.POSTGRES_USER ?? '__DATABASE_USER__',
    password: process.env.POSTGRES_PASSWORD ?? '__DATABASE_PASSWORD__',
    database: process.env.POSTGRES_DB ?? '__DATABASE_NAME__',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
    logging: Boolean(process.env.POSTGRES_LOGGING || 'false'),
    synchronize: false,
  };

  return dataSource;
};

export const dataSourceFactory = async (options: DataSourceOptions) => {
  const dataSource = await new DataSource(options).initialize();
  return dataSource;
};
