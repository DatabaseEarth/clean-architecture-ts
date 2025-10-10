import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { UserModule } from '../user';

import { IUserRepository } from '@/domain/user/repositories';
import { IRefreshTokenRepository } from '@/domain/auth/repositories';

import {
  RegisterAuthUseCase,
  LoginAuthUseCase,
  RefreshTokenAuthUseCase,
  LogoutAuthUseCase,
} from '@/application/auth/use-case';
import {
  IHashService,
  IUuidService,
  ITokenService,
} from '@/application/ports/security';
import { RefreshTokenService } from '@/application/auth/services';
import { ConfigPort } from '@/application/ports/config';

import { RefreshTokenRepositoryTypeORM } from '@/infrastructure/database/typeorm/repositories';
import { SecurityModule } from '../../infrastructure/security';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => SecurityModule)],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IRefreshTokenRepository',
      useClass: RefreshTokenRepositoryTypeORM,
    },
    {
      provide: RefreshTokenService,
      useFactory: (refreshRepo: IRefreshTokenRepository, uuid: IUuidService) =>
        new RefreshTokenService(refreshRepo, uuid),
      inject: ['IRefreshTokenRepository', 'IUuidService'],
    },
    {
      provide: RegisterAuthUseCase,
      useFactory: (
        userRepo: IUserRepository,
        hash: IHashService,
        uuid: IUuidService,
      ) => new RegisterAuthUseCase(userRepo, hash, uuid),
      inject: ['IUserRepository', 'IHashService', 'IUuidService'],
    },
    {
      provide: LoginAuthUseCase,
      useFactory: (
        userRepo: IUserRepository,
        hash: IHashService,
        uuid: IUuidService,
        token: ITokenService,
        config: ConfigPort,
        refreshService: RefreshTokenService,
      ) =>
        new LoginAuthUseCase(
          userRepo,
          hash,
          uuid,
          token,
          config,
          refreshService,
        ),
      inject: [
        'IUserRepository',
        'IHashService',
        'IUuidService',
        'ITokenService',
        'ConfigPort',
        RefreshTokenService,
      ],
    },
    {
      provide: RefreshTokenAuthUseCase,
      useFactory: (
        token: ITokenService,
        config: ConfigPort,
        refreshService: RefreshTokenService,
      ) => new RefreshTokenAuthUseCase(token, config, refreshService),
      inject: ['ITokenService', 'ConfigPort', RefreshTokenService],
    },
    {
      provide: LogoutAuthUseCase,
      useFactory: (refreshService: RefreshTokenService, token: ITokenService) =>
        new LogoutAuthUseCase(refreshService, token),
      inject: [RefreshTokenService, 'ITokenService'],
    },
  ],
  exports: [],
})
export class AuthModule {}
