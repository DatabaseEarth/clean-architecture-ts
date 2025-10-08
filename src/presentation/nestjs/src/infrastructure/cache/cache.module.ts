import { ConfigPort } from '@/application/ports/config/config.port';
import { RedisCacheService } from '@/infrastructure/cache/redis/redis.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: 'CachePort',
      useFactory: (config: ConfigPort) => new RedisCacheService(config),
      inject: ['ConfigPort'],
    },
  ],
  exports: ['CachePort'],
})
export class CacheModule {}
