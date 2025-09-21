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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const register_auth_usecase_1 = require("../../../../../../application/auth/use-case/register-auth.usecase");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const helpers_1 = require("../../../common/helpers");
const decorators_1 = require("../../../common/decorators");
let AuthController = class AuthController {
    constructor(registerAuthUseCase) {
        this.registerAuthUseCase = registerAuthUseCase;
    }
    //   @Public()
    async register(input) {
        await this.registerAuthUseCase.execute(input);
        return helpers_1.formatResponse.single(null, null, 'Đăng ký tài khoản thành công!');
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Đăng ký tài khoản' }),
    (0, swagger_1.ApiBody)({
        description: 'Dữ liệu yêu cầu',
        type: dto_1.RegisterRequestDto,
    }),
    (0, decorators_1.ApiDataResponse)(null),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Authentication'),
    (0, swagger_1.ApiExtraModels)(),
    __metadata("design:paramtypes", [register_auth_usecase_1.RegisterAuthUseCase])
], AuthController);
//# sourceMappingURL=auth.controller.js.map