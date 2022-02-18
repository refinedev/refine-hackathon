import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { jwtConstants } from '../constants/jwt';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { username: string }) {
    const { username } = payload;

    const user = await this.userService.userRepository.findOne({
      username,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
