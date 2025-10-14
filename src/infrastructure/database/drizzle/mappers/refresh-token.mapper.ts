import { RefreshToken } from "@/domain/auth/entities/refresh-token";
import { refreshTokens } from "../schema/refresh-tokens";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type RefreshTokenSelect = InferSelectModel<typeof refreshTokens>;
export type RefreshTokenInsert = InferInsertModel<typeof refreshTokens>;

export class RefreshTokenMapper {
  static toDomain(entity: RefreshTokenSelect): RefreshToken {
    return new RefreshToken(
      entity.id,
      entity.userId,
      entity.token,
      entity.sessionId,
      entity.deviceInfo,
      entity.ipAddress
    );
  }

  static toEntity(refreshToken: RefreshToken): RefreshTokenInsert {
    return {
      id: refreshToken.id,
      userId: refreshToken.userId,
      token: refreshToken.token,
      sessionId: refreshToken.sessionId,
      deviceInfo: refreshToken.deviceInfo,
      ipAddress: refreshToken.ipAddress,
    };
  }
}
