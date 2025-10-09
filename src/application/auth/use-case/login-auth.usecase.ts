import {
  IHashService,
  IUuidService,
  ITokenService,
} from "@/application/ports/security";
import { ConfigPort } from "@/application/ports/config";
import { IUserRepository } from "@/domain/user/repositories";
import { LoginUserRequestDto, LoginUserResponseDto } from "../dtos";
import { RefreshTokenService } from "../services";
import {
  InvalidCredentialsException,
  UserNotFoundException,
} from "@/shared-kernel/core";

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

      await this.refreshTokenService.create(user.id, refreshToken, sessionId);

      return { accessToken, refreshToken };
    } catch (error) {
      if (
        error instanceof UserNotFoundException ||
        error instanceof InvalidCredentialsException
      ) {
        throw error;
      }
      throw new Error("Login failed due to unexpected error");
    }
  }
}
