"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterResponseDto = exports.RegisterRequestDto = void 0;
const helpers_1 = require("../../../common/helpers");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class RegisterRequestDto {
}
exports.RegisterRequestDto = RegisterRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'full_name',
        type: 'string',
        example: 'Nguyễn Thành Vinh',
    }),
    (0, class_validator_1.IsString)({ message: helpers_1.validateMessage.string('Họ và tên') }),
    (0, class_validator_1.Length)(2, 255, { message: helpers_1.validateMessage.length('Họ và tên', 2, 255) }),
    (0, class_validator_1.IsNotEmpty)({ message: helpers_1.validateMessage.required('Họ và tên') }),
    (0, class_transformer_1.Expose)({ name: 'full_name' }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'email',
        type: 'string',
        example: 'info@vinhnt.vn',
    }),
    (0, class_validator_1.IsEmail)({}, { message: helpers_1.validateMessage.string('Email') }),
    (0, class_validator_1.MaxLength)(100, { message: helpers_1.validateMessage.max.string('Email', 100) }),
    (0, class_validator_1.IsNotEmpty)({ message: helpers_1.validateMessage.required('Email') }),
    (0, class_transformer_1.Expose)({ name: 'email' }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'phone',
        type: 'string',
        example: '+84775922008',
    }),
    (0, class_validator_1.Matches)(/^\+?[0-9]{8,15}$/, {
        message: helpers_1.validateMessage.invalid('Số điện thoại'),
    }),
    (0, class_validator_1.IsNotEmpty)({ message: helpers_1.validateMessage.required('Số điện thoại') }),
    (0, class_transformer_1.Expose)({ name: 'phone' }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'password',
        type: 'string',
        example: 'info@vinhnt.vn',
    }),
    (0, class_validator_1.IsString)({ message: helpers_1.validateMessage.string('Mật khẩu') }),
    (0, class_validator_1.IsNotEmpty)({ message: helpers_1.validateMessage.required('Mật khẩu') }),
    (0, class_validator_1.Length)(8, 50, { message: helpers_1.validateMessage.length('Mật khẩu', 8, 50) }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
        message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
    }),
    (0, class_transformer_1.Expose)({ name: 'password' }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "password", void 0);
class RegisterResponseDto {
}
exports.RegisterResponseDto = RegisterResponseDto;
//# sourceMappingURL=register.dto.js.map