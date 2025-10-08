export interface ITokenService {
    sign(payload: Record<string, any>, expiresIn?: string | number): Promise<string>;
    verify(token: string): Promise<Record<string, any> | null>;
}