import { REGEX_PATTERNS } from '@/shared-kernel/constants';
import { validateMessage } from '@/shared-kernel/validations';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { RegisterAuthRequestDto } from '@/application/auth/dtos';

export class RegisterRequestDto implements RegisterAuthRequestDto {
  @ApiProperty({
    name: 'fullname',
    type: 'string',
    example: 'Nguyễn Thành Vinh',
  })
  @IsString({ message: validateMessage.string('Họ và tên') })
  @Length(2, 255, { message: validateMessage.length('Họ và tên', 2, 255) })
  @IsNotEmpty({ message: validateMessage.required('Họ và tên') })
  fullName: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    example: 'info@vinhnt.vn',
  })
  @IsEmail({}, { message: validateMessage.string('Email') })
  @MaxLength(100, { message: validateMessage.max.string('Email', 100) })
  @IsNotEmpty({ message: validateMessage.required('Email') })
  email: string;

  @ApiProperty({
    name: 'phone',
    type: 'string',
    example: '+84775922008',
  })
  @Matches(REGEX_PATTERNS.PHONE, {
    message: validateMessage.invalid('Số điện thoại'),
  })
  @IsNotEmpty({ message: validateMessage.required('Số điện thoại') })
  phone: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    example: 'info@vinhnt.vn',
  })
  @IsString({ message: validateMessage.string('Mật khẩu') })
  @IsNotEmpty({ message: validateMessage.required('Mật khẩu') })
  @Length(8, 50, { message: validateMessage.length('Mật khẩu', 8, 50) })
  @Matches(REGEX_PATTERNS.PASSWORD, {
    message:
      'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
  })
  password: string;
}
