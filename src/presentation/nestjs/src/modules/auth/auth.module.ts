import { RegisterAuthUseCase } from '@/application/auth/use-case/register-auth.usecase';
import { UserRepositoryTypeORM } from '@/infrastructure/databse/typeorm/repositories/user.repository.typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { BcryptHashService } from '@/infrastructure/security/bcrypt/bcrypt-hash.service';
import { CryptoUuidService } from '@/infrastructure/security/crypto/crypto-uuid.service';
import { IUserRepository } from '@/domain/user/repositories/user.repository';
import { IHashService } from '@/application/security/services/hash.service';
import { IUuidService } from '@/application/security/services/uuid.service';
import { RefreshTokenRepositoryTypeORM } from '@/infrastructure/databse/typeorm/repositories/refresh-token.repository.typeorm';
import { RefreshTokenService } from '@/application/auth/services/refresh-token.service';
import { IRefreshTokenRepository } from '@/domain/auth/repositories/refresh-token.repository';
import { LoginAuthUseCase } from '@/application/auth/use-case/login-auth.usecase';
import { JwtTokenService } from '@/infrastructure/security/jwt/jwt-token.service';
import { ITokenService } from '@/application/security/services/token.service';
import { ConfigPort } from '@/application/common/ports/config.port';
import { StringValue } from 'ms';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepositoryTypeORM },
    { provide: 'IHashService', useClass: BcryptHashService },
    { provide: 'IUuidService', useClass: CryptoUuidService },
    {
      provide: 'ITokenService',
      useFactory: (config: ConfigPort) =>
        new JwtTokenService(
          config.get<string>('AUTH_SECRET'),
          config.get<StringValue>('AUTH_ACCESS_TOKEN_EXPIRES'),
        ),
      inject: ['ConfigPort'],
    },
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
  ],
  exports: [],
})
export class AuthModule {}
