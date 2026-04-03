import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../../users/user.entity/user.entity';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) return false;

    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;

    if (user.status !== 'active') {
      throw new UnauthorizedException('User account is not active');
    }

    return true;
  }
}