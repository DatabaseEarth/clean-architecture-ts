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
exports.CatchEverythingFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let CatchEverythingFilter = class CatchEverythingFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        let httpStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let error_code = 'INTERNAL_SERVER_ERROR';
        let details = undefined;
        if (exception instanceof common_1.HttpException) {
            httpStatus = exception.getStatus();
            const response = exception.getResponse();
            if (typeof response === 'string') {
                message = response;
                details = exception.stack;
            }
            else if (typeof response === 'object' && response !== null) {
                message = response['message'] || message;
                error_code = response['error'] || error_code;
                details = response['details'] || response['errors'] || undefined;
            }
        }
        else if (exception instanceof Error) {
            message = exception.message;
            details = exception.stack;
        }
        const responseBody = {
            status: 'error',
            message,
            error_code,
            details,
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
};
exports.CatchEverythingFilter = CatchEverythingFilter;
exports.CatchEverythingFilter = CatchEverythingFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], CatchEverythingFilter);
//# sourceMappingURL=catch-everything.filter.js.map