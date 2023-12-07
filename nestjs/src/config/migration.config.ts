import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { makeDataSourceOptions } from './data-source';

config({ path: '.env' });
const dataSource = new DataSource(makeDataSourceOptions());
dataSource.initialize();

export default dataSource;
