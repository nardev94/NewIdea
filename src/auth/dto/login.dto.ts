import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Col } from 'sequelize/lib/utils';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}