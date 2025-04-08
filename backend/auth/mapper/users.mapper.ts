import Singleton from '../../shared/base/singleton';
import { User, UserDto } from '../types';

class UserMapper extends Singleton {
  constructor() {
    super();
  }

  public mapUser(user: User): UserDto {
    return {
      id: user.id,
      image: user.image,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      role: user.role
    };
  }
}

export const userMapper = UserMapper.getInstance<UserMapper>();
