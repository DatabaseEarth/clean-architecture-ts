"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const register_auth_usecase_1 = require("../../../../../application/auth/use-case/register-auth.usecase");
const user_repository_typeorm_1 = require("../../../../../infrastructure/databse/typeorm/repositories/user.repository.typeorm");
const common_1 = require("@nestjs/common");
const controllers_1 = require("./controllers");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controllers_1.AuthController],
        providers: [
            {
                provide: register_auth_usecase_1.RegisterAuthUseCase,
                useFactory: (userRepo) => new register_auth_usecase_1.RegisterAuthUseCase(userRepo),
                inject: [user_repository_typeorm_1.UserRepositoryTypeORM],
            },
            user_repository_typeorm_1.UserRepositoryTypeORM
        ],
        exports: []
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map