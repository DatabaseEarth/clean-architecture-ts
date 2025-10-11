import { Module } from '@nestjs/common';

import { UserRepositoryTypeORM } from '@/infrastructure/database/typeorm/repositories';
import { UserController } from './controllers';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [{ provide: 'IUserRepository', useClass: UserRepositoryTypeORM }],
  exports: ['IUserRepository'],
})
export class UserModule {}
