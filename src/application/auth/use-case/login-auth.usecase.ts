import {
  IHashService,
  IUuidService,
  ITokenService,
} from "@/application/ports/security";
import { ConfigPort } from "@/application/ports/config";
import { IUserRepository } from "@/domain/user/repositories";
import { LoginAuthRequestDto, LoginAuthResponseDto } from "../dtos";
import { RefreshTokenService } from "../services";
import { BaseException } from "@/shared-kernel/exceptions";
import { ErrorCode } from "@/shared-kernel/enums/exception.enum";
import { ERROR_CODES, VALIDATION_MESSAGES } from "@/shared-kernel/constants";

export class LoginAuthUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly hashService: IHashService,
    private readonly uuidService: IUuidService,
    private readonly tokenService: ITokenService,
    private readonly configPort: ConfigPort,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  async execute(input: LoginAuthRequestDto): Promise<LoginAuthResponseDto> {
    const { email, password } = input;

    try {
      const user = await this.userRepo.findByEmail(email);
      if (!user)
        throw new BaseException({
          code: ErrorCode.USER_NOT_FOUND,
          message: VALIDATION_MESSAGES.INVALID_CREDENTIALS,
          httpStatus: ERROR_CODES[ErrorCode.USER_NOT_FOUND].httpStatus,
        });

      const match = await user.verifyPassword(
        user.password,
        password,
        this.hashService
      );
      if (!match)
        throw new BaseException({
          code: ErrorCode.INVALID_CREDENTIALS,
          message: VALIDATION_MESSAGES.INVALID_CREDENTIALS,
          httpStatus: ERROR_CODES[ErrorCode.INVALID_CREDENTIALS].httpStatus,
        });

      const sessionId = this.uuidService.generate();
      const payload = {
        id: user.id,
        email: user.email,
        phone: user.phone,
        fullName: user.fullName,
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

      await this.refreshTokenService.create(user.id, refreshToken, sessionId);

      return { accessToken, refreshToken };
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
