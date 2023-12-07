import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  password: string;
}
