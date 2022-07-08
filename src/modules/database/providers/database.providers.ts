
import { Role } from '../../../models/role.entity';
import { UserRole } from '../../../models/userRole.entity';
import { Connection } from 'typeorm';
import { User } from '../../../models/user.entity';
import { Image } from '../../../models/image.entity';

export const databaseProviders = [ 
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'USER_ROLE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UserRole),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Role),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'IMAGE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Image),
    inject: ['DbConnectionToken'],
  }
];
