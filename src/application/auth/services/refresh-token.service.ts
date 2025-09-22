import { RefreshToken } from "@/domain/auth/entities/refresh-token";
import { IRefreshTokenRepository } from "@/domain/auth/repositories/refresh-token.repository";
import { IUuidService } from "@/application/security/services/uuid.service";

export class RefreshTokenService {
    constructor(
        private readonly repo: IRefreshTokenRepository,
        private readonly uuid: IUuidService,
    ) { }

    async create(userId: string, token: string, sessionId: string, deviceInfo?: string, ipAddress?: string): Promise<RefreshToken> {
        const rt = new RefreshToken(this.uuid.generate(), userId, token, sessionId, deviceInfo, ipAddress);
        return this.repo.save(rt);
    }
}