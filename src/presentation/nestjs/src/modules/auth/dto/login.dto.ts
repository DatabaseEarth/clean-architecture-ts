import { ApiProperty, PickType } from '@nestjs/swagger';
import { RegisterRequestDto } from './register.dto';
import { Expose, Transform } from 'class-transformer';

export class LoginRequestDto extends PickType(RegisterRequestDto, [
  'email',
  'password',
] as const) {}

export class TokenSessionDto {
  @ApiProperty({ name: 'accessToken', type: 'string' })
  accessToken: string;

  @ApiProperty({ name: 'refreshToken', type: 'string' })
  refreshToken: string;
}

export class LoginResponseDto extends TokenSessionDto {
  @Transform(({ obj }) => obj.accessToken)
  accessToken: string;

  @Transform(({ obj }) => obj.refreshToken)
  refreshToken: string;
}
