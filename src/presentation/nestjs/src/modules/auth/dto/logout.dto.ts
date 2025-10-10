import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { validateMessage } from '@/shared-kernel/validations';
import { TokenSessionDto } from './login.dto';

export class LogoutRequestDto extends PickType(TokenSessionDto, [
  'refreshToken',
] as const) {
  @ApiProperty({
    name: 'refreshToken',
    type: 'string',
  })
  @IsNotEmpty({
    message: validateMessage.required('Mã thông báo không được để trống!'),
  })
  @IsString({ message: validateMessage.string('Mã thông báo') })
  refreshToken: string;
}
