import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity/user.entity';
import { RegisterDto } from './dto/register.dto';

type UserWithoutPassword = Omit<UserEntity, 'password'>;

@Injectable()
export class AuthService {
constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

   async validateUser(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return null;

    return user;
  }

  async login(user: UserEntity): Promise<{ access_token: string; user: UserWithoutPassword }> {
    const payload = { sub: user.id, email: user.email };

    const { password, ...userWithoutPassword } = user;

    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }

  async register(data: RegisterDto): Promise<UserWithoutPassword> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
