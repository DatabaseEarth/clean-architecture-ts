import { RefreshToken } from "../entities";

export interface IRefreshTokenRepository {
  save(token: RefreshToken): Promise<RefreshToken>;
  update(token: RefreshToken): Promise<RefreshToken>;
  findByToken(token: string): Promise<RefreshToken | null>;
  getRefreshTokenBySessionId(sessionId: string): Promise<RefreshToken | null>;
  deleteBySessionId(sessionId: string): Promise<void>;
}
