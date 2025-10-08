import { Module } from '@nestjs/common';

import { UserRepositoryTypeORM } from '@/infrastructure/database/typeorm/repositories';

@Module({
  imports: [],
  controllers: [],
  providers: [{ provide: 'IUserRepository', useClass: UserRepositoryTypeORM }],
  exports: ['IUserRepository'],
})
export class UserModule {}
