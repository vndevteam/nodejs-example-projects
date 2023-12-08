import { DataSource, DataSourceOptions } from 'typeorm';

export const makeDataSourceOptions = (): DataSourceOptions => {
  const dataSource: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST ?? '__DB_HOST__',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER ?? '__DB_USER__',
    password: process.env.DB_PASSWORD ?? '__DB_PASSWORD__',
    database: process.env.DB_NAME ?? '__DB_NAME__',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
    logging: Boolean(process.env.DB_LOGGING || 'false'),
    synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
  };

  return dataSource;
};

export const dataSourceFactory = async (
  options: DataSourceOptions,
): Promise<DataSource> => {
  return await new DataSource(options).initialize();
};
