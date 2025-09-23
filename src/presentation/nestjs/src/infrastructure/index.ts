import { CacheModule } from './cache';
import { ConfigModule } from './config';
import { LoggerModule } from './logger';

export const infrastructure = [LoggerModule, ConfigModule, CacheModule];
