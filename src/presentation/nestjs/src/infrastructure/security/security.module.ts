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
  ],
  exports: ['IHashService', 'IUuidService', 'ITokenService'],
})
export class SecurityModule {}
