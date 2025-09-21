"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const interceptors_1 = require("./interceptors");
const middleware_1 = require("../common/middleware");
const pipes_1 = require("../common/pipes");
const filters_1 = require("../common/filters");
let CoreModule = class CoreModule {
    configure(consumer) {
        consumer.apply(middleware_1.LoggerMiddleware).forRoutes('{*splat}');
    }
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Module)({
        providers: [
            { provide: core_1.APP_INTERCEPTOR, useClass: interceptors_1.TransformInterceptor },
            { provide: core_1.APP_INTERCEPTOR, useClass: interceptors_1.LoggingInterceptor },
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                    transform: true,
                    transformOptions: { enableImplicitConversion: true },
                    exceptionFactory: (errors) => new pipes_1.ValidationException(errors),
                }),
            },
            {
                provide: core_1.APP_FILTER,
                useClass: filters_1.CatchEverythingFilter,
            },
        ],
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map