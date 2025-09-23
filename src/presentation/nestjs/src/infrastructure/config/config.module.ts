import { Module, Global } from '@nestjs/common';
import { EnvConfigService } from '@/infrastructure/config/joi/env.config';

@Global()
@Module({
  providers: [
    {
      provide: 'ConfigPort',
      useClass: EnvConfigService,
    },
  ],
  exports: ['ConfigPort'],
})
export class ConfigModule {}
