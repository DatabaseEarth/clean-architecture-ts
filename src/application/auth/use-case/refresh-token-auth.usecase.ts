import { ConfigPort, ITokenService } from "@/application/ports";
import { LoginAuthResponseDto, LogoutAuthRequestDto } from "../dtos";
import { RefreshTokenService } from "../services";
import { BaseException } from "@/shared-kernel/exceptions";
import { ErrorCode } from "@/shared-kernel/enums/exception.enum";
import { ERROR_CODES, VALIDATION_MESSAGES } from "@/shared-kernel/constants";

export class RefreshTokenAuthUseCase {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly configPort: ConfigPort,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  async execute(input: LogoutAuthRequestDto): Promise<LoginAuthResponseDto> {
    try {
      const payloadDecode = await this.tokenService.verify(input.refreshToken);
      const existingToken =
        await this.refreshTokenService.getRefreshTokenBySessionId(
          payloadDecode.sessionId
        );

      const sessionId = payloadDecode.sessionId;
      const payload = {
        id: payloadDecode.id,
        email: payloadDecode.email,
        phone: payloadDecode.phone,
        fullName: payloadDecode.fullName,
        sessionId,
      };

      const [accessToken, refreshToken] = await Promise.all([
        this.tokenService.sign(
          payload,
          this.configPort.get<string>("AUTH_ACCESS_TOKEN_EXPIRES")
        ),
        this.tokenService.sign(
          payload,
          this.configPort.get<string>("AUTH_REFRESH_TOKEN_EXPIRES")
        ),
      ]);

      existingToken.updateToken(refreshToken);
      await this.refreshTokenService.update(existingToken);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof BaseException) throw error;
      throw new BaseException({
        code: ErrorCode.INTERNAL_ERROR,
        message: VALIDATION_MESSAGES.LOGIN_FAILED,
        httpStatus: ERROR_CODES[ErrorCode.INTERNAL_ERROR].httpStatus,
      });
    }
  }
}
