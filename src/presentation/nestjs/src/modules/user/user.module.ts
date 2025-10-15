import { Module } from '@nestjs/common';

import { UserRepositoryPrisma } from '@/infrastructure/database/prisma/repositories';
import { UserController } from './controllers';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [{ provide: 'IUserRepository', useClass: UserRepositoryPrisma }],
  exports: ['IUserRepository'],
})
export class UserModule {}
