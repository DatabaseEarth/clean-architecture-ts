import { RefreshToken } from "../entities";

export interface IRefreshTokenRepository {
    save(token: RefreshToken): Promise<RefreshToken>;
    findByToken(token: string): Promise<RefreshToken | null>;
    deleteBySessionId(sessionId: string): Promise<void>;
}
