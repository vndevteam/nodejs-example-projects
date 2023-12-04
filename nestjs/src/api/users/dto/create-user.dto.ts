import {
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { REGEX } from '../../../common/constants/constant';
import { GENDER_ENUM } from '../../../common/constants/enums/gender.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  @MaxLength(500)
  email: string;

  @IsNumberString()
  @IsOptional()
  phone_number: string;

  @Matches(REGEX.PASSWORD)
  @IsOptional()
  password: string;

  @IsEnum(GENDER_ENUM)
  @IsOptional()
  gender: GENDER_ENUM;

  @IsString()
  @IsOptional()
  address: string;
}
