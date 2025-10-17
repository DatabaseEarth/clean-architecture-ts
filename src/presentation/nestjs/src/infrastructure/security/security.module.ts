import { Module } from '@nestjs/common';
import { StringValue } from 'ms';

import { ConfigPort } from '@/application/ports/config';

import { BcryptHashService } from '@/infrastructure/security/bcrypt';
import { CryptoUuidService } from '@/infrastructure/security/crypto';
import { JwtTokenService } from '@/infrastructure/security/jwt';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'IHashService',
      useFactory: (config: ConfigPort) => new BcryptHashService(config),
      inject: ['ConfigPort'],
    },
    {
      provide: 'IUuidService',
      useClass: CryptoUuidService,
    },
    {
      provide: 'ITokenService',
      useFactory: (config: ConfigPort) => new JwtTokenService(config),
      inject: ['ConfigPort'],
    },
  ],
  exports: ['IHashService', 'IUuidService', 'ITokenService'],
})
export class SecurityModule {}
