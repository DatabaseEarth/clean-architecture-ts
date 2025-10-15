import { RefreshToken } from "@/domain/auth/entities";
import { RefreshToken as PrismaRefreshToken } from "@prisma/client";

export class RefreshTokenMapper {
  static toDomain(entity: PrismaRefreshToken): RefreshToken {
    const refreshToken = new RefreshToken(
      entity.id,
      entity.userId,
      entity.token,
      entity.sessionId,
      entity.deviceInfo,
      entity.ipAddress
    );

    return refreshToken;
  }

  static toEntity(domain: RefreshToken): Omit<PrismaRefreshToken, "user"> {
    return {
      id: domain.id,
      userId: domain.userId,
      token: domain.token,
      sessionId: domain.sessionId,
      deviceInfo: domain.deviceInfo,
      ipAddress: domain.ipAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    };
  }
}
