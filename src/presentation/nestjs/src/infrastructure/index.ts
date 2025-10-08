import { CacheModule } from './cache';
import { ConfigModule } from './config';
import { LoggerModule } from './logger';
import { SecurityModule } from './security';

export const infrastructure = [
  LoggerModule,
  ConfigModule,
  CacheModule,
  SecurityModule,
];
