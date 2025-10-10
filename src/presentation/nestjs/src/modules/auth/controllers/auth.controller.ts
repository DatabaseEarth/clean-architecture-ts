import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  RegisterRequestDto,
  RefreshTokenRequestDto,
} from '../dto';
import { ApiDataResponse } from '../../../common/decorators';
import { ApiResponse, RestResponse } from '@/shared-kernel/responses';
import {
  RegisterAuthUseCase,
  LoginAuthUseCase,
  LogoutAuthUseCase,
  RefreshTokenAuthUseCase,
} from '@/application/auth/use-case';

@Controller('auth')
@ApiTags('Authentication')
@ApiExtraModels(LoginResponseDto)
export class AuthController {
  constructor(
    private readonly registerAuthUseCase: RegisterAuthUseCase,
    private readonly loginAuthUseCase: LoginAuthUseCase,
    private readonly logoutAuthUseCase: LogoutAuthUseCase,
    private readonly refreshTokenAuthUseCase: RefreshTokenAuthUseCase,
  ) {}

  //   @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  @ApiBody({
    description: 'Dữ liệu yêu cầu',
    type: RegisterRequestDto,
  })
  @ApiDataResponse(null)
  async register(
    @Body() input: RegisterRequestDto,
  ): Promise<ApiResponse<null>> {
    await this.registerAuthUseCase.execute(input);
    return RestResponse.success<null>(null, 'Đăng ký tài khoản thành công!');
  }

  //   @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  @ApiBody({
    description: 'Dữ liệu yêu cầu',
    type: LoginRequestDto,
  })
  @ApiDataResponse(LoginResponseDto)
  async login(
    @Body() loginRequest: LoginRequestDto,
  ): Promise<ApiResponse<LoginResponseDto>> {
    const data = await this.loginAuthUseCase.execute(loginRequest);

    return RestResponse.success<LoginResponseDto>(
      data,
      'Đăng ký tài khoản thành công!',
    );
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đăng xuất tài khoản' })
  @ApiBody({
    description: 'Dữ liệu yêu cầu',
    type: LogoutRequestDto,
  })
  @ApiDataResponse(null)
  async logout(@Body() body: LogoutRequestDto): Promise<ApiResponse<true>> {
    await this.logoutAuthUseCase.execute(body);
    return RestResponse.success<true>(null, 'Đăng xuất thành công!');
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Làm mới access token' })
  @ApiBody({
    description: 'Dữ liệu yêu cầu',
    type: RefreshTokenRequestDto,
  })
  @ApiDataResponse(LoginResponseDto)
  async refreshToken(
    @Body() body: RefreshTokenRequestDto,
  ): Promise<ApiResponse<LoginResponseDto>> {
    const data = await this.refreshTokenAuthUseCase.execute(body);
    return RestResponse.success<LoginResponseDto>(
      data,
      'Làm mới token thành công!',
    );
  }
}
