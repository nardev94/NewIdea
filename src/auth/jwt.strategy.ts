import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import { UserEntity } from '../users/user.entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET_KEY', // move to env later
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}