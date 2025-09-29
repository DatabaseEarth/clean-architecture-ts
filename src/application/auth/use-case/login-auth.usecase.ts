import { IHashService } from "@/shared-kernel/application/ports/security/hash.port";
import { ITokenService } from "@/shared-kernel/application/ports/security/token.port";
import { IUserRepository } from "@/domain/user/repositories/user.repository";
import { LoginUserRequestDto } from "../dtos/login-auth.request.dto";
import { LoginUserResponseDto } from "../dtos/login-auth.response.dto";
import { IUuidService } from "@/shared-kernel/application/ports/security/uuid.port";
import { ConfigPort } from "@/shared-kernel/application/ports/config/config.port";
import { RefreshTokenService } from "../services/refresh-token.service";
import { InvalidCredentialsException, UserNotFoundException } from "@/shared-kernel/domain/exceptions";

export class LoginAuthUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly hashService: IHashService,
    private readonly uuidService: IUuidService,
    private readonly tokenService: ITokenService,
    private readonly configPort: ConfigPort,
    private readonly refreshTokenService: RefreshTokenService
  ) { }

  async execute(input: LoginUserRequestDto): Promise<LoginUserResponseDto> {
    const { email, password } = input;
    
    try {
      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        throw new UserNotFoundException(email);
      }

      const match = await this.hashService.compare(password, user.password);
      if (!match) {
        throw new InvalidCredentialsException();
      }

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

      await this.refreshTokenService.create(
        user.id,
        refreshToken,
        sessionId
      );

      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof UserNotFoundException || error instanceof InvalidCredentialsException) {
        throw error;
      }
      throw new Error('Login failed due to unexpected error');
    }
  }
}
