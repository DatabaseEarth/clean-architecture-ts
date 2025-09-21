// infrastructure/config/config.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigPort } from '@/application/common/ports/config.port';
import { EnvConfigService } from '@/infrastructure/config/joi/env.config';

@Global()
@Module({
    providers: [
        {
            provide: ConfigPort,
            useClass: EnvConfigService,
        },
    ],
    exports: [ConfigPort],
})
export class ConfigModule { }
