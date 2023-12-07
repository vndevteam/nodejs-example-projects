import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth-typeorm/auth.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { RegisterUserDto } from './users/dto/register-user.dto';
import { EntitySchema, MixedList } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

export const createTypeOrmModule = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  entities: MixedList<Function | string | EntitySchema>,
): DynamicModule => {
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'vndevteam_nest_auth',
    synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    autoLoadEntities: true,
    logging: true,
    entities: entities,
  });
};

@Module({
  imports: [
    createTypeOrmModule([UserEntity]),
    AuthModule.register<UserEntity, RegisterUserDto>({
      authKey: 'auth_key_with_32_bytes_randomly_',
      typeOrmUserEntity: UserEntity,
      userAuthService: null,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
