import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  controllers: [],
  providers: [AuthService],
})
export class AuthModule {}
