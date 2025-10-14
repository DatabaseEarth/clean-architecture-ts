import { Injectable } from "@nestjs/common";
import { IRefreshTokenRepository } from "@/domain/auth/repositories";
import { RefreshToken } from "@/domain/auth/entities";
import { db } from "../config";
import { refreshTokens } from "../schema/refresh-tokens";
import { RefreshTokenMapper } from "../mappers";
import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { PoolClient } from "pg";

@Injectable()
export class RefreshTokenRepositoryDrizzle implements IRefreshTokenRepository {
  private client?: PoolClient;

  setClient(client: PoolClient): void {
    this.client = client;
  }

  private getDb() {
    if (this.client) {
      return drizzle(this.client, { schema: { refreshTokens } });
    }
    return db;
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const result = await this.getDb()
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, token))
      .limit(1);
    if (result.length === 0) return null;
    return RefreshTokenMapper.toDomain(result[0]);
  }

  async save(refreshToken: RefreshToken): Promise<RefreshToken> {
    const entity = RefreshTokenMapper.toEntity(refreshToken);
    await this.getDb()
      .insert(refreshTokens)
      .values(entity)
      .onConflictDoUpdate({
        target: refreshTokens.id,
        set: {
          token: entity.token,
          sessionId: entity.sessionId,
          deviceInfo: entity.deviceInfo,
          ipAddress: entity.ipAddress,
          updatedAt: new Date(),
        },
      });
    return refreshToken;
  }

  async deleteBySessionId(sessionId: string): Promise<void> {
    await this.getDb()
      .delete(refreshTokens)
      .where(eq(refreshTokens.sessionId, sessionId));
  }
}
