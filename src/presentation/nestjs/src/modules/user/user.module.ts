import { Module } from '@nestjs/common';

import { UserRepositoryDrizzle } from '@/infrastructure/database/drizzle/repositories';

@Module({
  imports: [],
  controllers: [],
  providers: [{ provide: 'IUserRepository', useClass: UserRepositoryDrizzle }],
  exports: ['IUserRepository'],
})
export class UserModule {}
