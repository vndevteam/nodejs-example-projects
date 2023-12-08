import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ObjectLiteral } from 'typeorm';
import { Strategy as PassportLocalStrategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy<
  Entity extends ObjectLiteral,
> extends PassportStrategy(PassportLocalStrategy) {
  constructor(private readonly authService: AuthService<Entity>) {
    super({
      usernameField: authService.userService.requestUsernameField || 'username',
      passwordField: authService.userService.requestPasswordField || 'password',
    });
  }

  async validate(username: string, password: string): Promise<Entity> {
    const user = await this.authService.userService.login(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
