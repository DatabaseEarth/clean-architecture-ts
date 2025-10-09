import { RegisterAuthUseCase } from '@/application/auth/use-case/register-auth.usecase';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto, RegisterRequestDto } from '../dto';
import { formatResponse } from '../../../common/helpers';
import { ApiDataResponse } from '../../../common/decorators';
import { ApiResponse } from '@/shared-kernel/responses';
import { LoginAuthUseCase } from '@/application/auth/use-case/login-auth.usecase';

@Controller('auth')
@ApiTags('Authentication')
@ApiExtraModels(LoginResponseDto)
export class AuthController {
  constructor(
    private readonly registerAuthUseCase: RegisterAuthUseCase,
    private readonly loginAuthUseCase: LoginAuthUseCase,
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
  async register(@Body() input: RegisterRequestDto) {
    await this.registerAuthUseCase.execute(input);
    return formatResponse.single(null, null, 'Đăng ký tài khoản thành công!');
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
    return formatResponse.single(
      LoginResponseDto,
      data,
      'Đăng nhập tài khoản thành công!',
    );
  }
}
