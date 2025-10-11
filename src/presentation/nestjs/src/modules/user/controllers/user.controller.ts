import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiDataResponse, CurrentUser } from '../../../common/decorators';
import { ICurrentUserPayload } from '@/shared-kernel/interfaces';
import { ApiResponse, RestResponse } from '@/shared-kernel/responses';

@Controller('user')
@ApiTags('User')
export class UserController {
  @Get('profile')
  @ApiOperation({ summary: 'Lấy thông tin profile của user hiện tại' })
  @ApiDataResponse(Object)
  async getProfile(
    @CurrentUser() user: ICurrentUserPayload,
  ): Promise<ApiResponse<ICurrentUserPayload>> {
    return RestResponse.success<ICurrentUserPayload>(
      user,
      'Lấy thông tin profile thành công!',
    );
  }
}
