import { ITokenService } from "@/application/ports";
import { LogoutAuthRequestDto } from "../dtos";
import { RefreshTokenService } from "../services";

export class LogoutAuthUseCase {
  constructor(
    private readonly refreshTokenService: RefreshTokenService,
    private readonly tokenService: ITokenService
  ) {}

  async execute(input: LogoutAuthRequestDto): Promise<true> {
    const { refreshToken } = input;
    try {
      const payload = await this.tokenService.verify(refreshToken);
      await this.refreshTokenService.delete(payload.sessionId);
      return true;
    } catch (error) {
      return true;
    }
  }
}
