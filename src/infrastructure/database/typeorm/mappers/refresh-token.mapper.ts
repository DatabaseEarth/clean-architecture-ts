import { RefreshToken } from "@/domain/auth/entities/refresh-token";
import { RefreshTokenEntity } from "../entities/refresh-token.entity";

export class RefreshTokenMapper {
    static toDomain(entity: RefreshTokenEntity): RefreshToken {
        return new RefreshToken(
            entity.id,
            entity.userId,
            entity.token,
            entity.sessionId,
            entity.deviceInfo,
            entity.ipAddress
        );
    }

    static toEntity(domain: RefreshToken): RefreshTokenEntity {
        const entity = new RefreshTokenEntity();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.token = domain.token;
        entity.sessionId = domain.sessionId;
        entity.deviceInfo = domain.deviceInfo;
        entity.ipAddress = domain.ipAddress;
        return entity;
    }
}
