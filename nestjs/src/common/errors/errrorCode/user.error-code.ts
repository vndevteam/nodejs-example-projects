import { User } from 'src/api/users/entities/user.entity';

export const userError = {
  isExistUser: {
    code: 'user-1000',
    field: 'userId',
    resource: User.name,
  },
};
