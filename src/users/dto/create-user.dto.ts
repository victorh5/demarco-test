import { User } from '../entities/user.entity';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto extends User {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  type: string;
}
