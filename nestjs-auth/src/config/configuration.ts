import { makeDataSourceOptions } from './data-source';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: makeDataSourceOptions(),
});
