import { Module } from '@nestjs/common';

import { UserRepositoryDrizzle } from '@/infrastructure/database/drizzle/repositories';
import { UserController } from './controllers';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [{ provide: 'IUserRepository', useClass: UserRepositoryDrizzle }],
  exports: ['IUserRepository'],
})
export class UserModule {}
