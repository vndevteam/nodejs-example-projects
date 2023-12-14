import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll(@I18n() i18n: I18nContext) {
    return i18n.t('admin.users.findAll');
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
