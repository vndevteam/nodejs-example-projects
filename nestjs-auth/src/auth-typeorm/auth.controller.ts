import { Request } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() body): Promise<any> {
    const { user, token } = await this.authService.userService.register(body);
    return await this.authService.userService.onAfterRegister(
      body,
      user,
      token,
    );
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Req() req: Request): Promise<any> {
    const {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    } = await this.authService.getLoginTokens(req.user);
    return await this.authService.userService.onAfterLogin(
      req.user,
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    );
  }

  @Get('profile')
  getProfile(req) {
    return req.user;
  }
}
