import { CachePort } from "@/application/ports/cache";
import { ConfigPort } from "@/application/ports/config";
import Redis from "ioredis";

export class RedisCacheService implements CachePort {
  private client: Redis;

  constructor(config: ConfigPort) {
    this.client = new Redis({
      host: config.get<string>("REDIS_HOST"),
      port: config.get<number>("REDIS_PORT"),
      username: config.get<string>("REDIS_USERNAME"),
      password: config.get<string>("REDIS_PASSWORD"),
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.client.set(key, JSON.stringify(value), "EX", ttl ?? 3600);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
