import { RegisterAuthUseCase } from "@/application/auth/use-case/register-auth.usecase";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RegisterRequestDto } from "../dto";
import { formatResponse } from "../../../common/helpers";
import { ApiDataResponse } from "../../../common/decorators";

@Controller('auth')
@ApiTags('Authentication')
@ApiExtraModels()
export class AuthController {
    constructor(private readonly registerAuthUseCase: RegisterAuthUseCase) { }

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
}