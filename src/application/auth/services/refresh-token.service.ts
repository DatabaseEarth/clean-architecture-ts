import { RefreshToken } from "@/domain/auth/entities";
import { IRefreshTokenRepository } from "@/domain/auth/repositories";
import { IUuidService } from "@/application/ports/security";

export class RefreshTokenService {
  constructor(
    private readonly repo: IRefreshTokenRepository,
    private readonly uuid: IUuidService
  ) {}

  async create(
    userId: string,
    token: string,
    sessionId: string,
    deviceInfo?: string,
    ipAddress?: string
  ): Promise<RefreshToken> {
    const rt = new RefreshToken(
      this.uuid.generate(),
      userId,
      token,
      sessionId,
      deviceInfo,
      ipAddress
    );
    return this.repo.save(rt);
  }

  async update(token: RefreshToken): Promise<RefreshToken> {
    return this.repo.update(token);
  }

  async getRefreshTokenBySessionId(
    sessionId: string
  ): Promise<RefreshToken | null> {
    return this.repo.getRefreshTokenBySessionId(sessionId);
  }

  async delete(sessionId: string): Promise<void> {
    await this.repo.deleteBySessionId(sessionId);
  }
}
