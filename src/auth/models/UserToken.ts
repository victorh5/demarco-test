import { User } from 'src/users/entities/user.entity';

export interface UserToken {
  access_token: string;
  user_info: User;
}
