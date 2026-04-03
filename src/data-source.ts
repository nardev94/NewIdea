import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from './users/user.entity/user.entity'; 
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'db8141',
  database: 'new_idea_db',
  entities: [UserEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, 
});