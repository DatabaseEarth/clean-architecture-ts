import { IHashService } from "@/application/security/services/hash.service";
import { ITokenService } from "@/application/security/services/token.service";
import { IUserRepository } from "@/domain/user/repositories/user.repository";
import { LoginUserRequestDto } from "../dtos/login-auth.request.dto";
import { LoginUserResponseDto } from "../dtos/login-auth.response.dto";
import { IUuidService } from "@/application/security/services/uuid.service";
import { ConfigPort } from "@/application/common/ports/config.port";
import { RefreshTokenService } from "../services/refresh-token.service";

export class LoginAuthUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly hashService: IHashService,
    private readonly uuidService: IUuidService,
    private readonly tokenService: ITokenService,
    private readonly configPort: ConfigPort,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  async execute(input: LoginUserRequestDto): Promise<LoginUserResponseDto> {
    const { email, password } = input;
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const match = await this.hashService.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const payload = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      sessionId: this.uuidService.generate(),
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
      payload.sessionId
    );

    return { accessToken, refreshToken };
  }
}
