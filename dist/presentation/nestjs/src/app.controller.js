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
exports.AppController = void 0;
const app_service_1 = require("./app.service");
const common_1 = require("@nestjs/common");
const decorators_1 = require("./common/decorators");
const app_dto_1 = require("./app.dto");
const swagger_1 = require("@nestjs/swagger");
const helpers_1 = require("./common/helpers");
const logger_port_1 = require("../../../application/common/ports/logger.port");
let AppController = class AppController {
    constructor(appService, logger) {
        this.appService = appService;
        this.logger = logger;
    }
    async example() {
        // const data = this.appService.getConfig();
        throw new common_1.HttpException('hehehe', common_1.HttpStatus.NOT_FOUND);
        // return formatResponse.single(AppResponse, data, 'Lấy dữ liệu thành công');
    }
    async exampleArray() {
        const data = this.appService.getConfig();
        throw new common_1.HttpException('hehehe', common_1.HttpStatus.NOT_FOUND);
        return helpers_1.formatResponse.array(app_dto_1.AppResponse, [data], 'Lấy dữ liệu mảng thành công');
    }
    async examplePaginate(appRequest) {
        const data = this.appService.getConfig();
        throw new common_1.HttpException('hehehe', common_1.HttpStatus.NOT_FOUND);
        return helpers_1.formatResponse.paginate(app_dto_1.AppResponse, [data], 'Lấy dữ liệu phân trang thành công', appRequest.page, appRequest.size);
    }
    async exampleNull() {
        const data = this.appService.getConfig();
        return helpers_1.formatResponse.single(null, null, 'Thao tác thành công');
    }
    async testError() {
        throw new common_1.HttpException('Test error for interceptor', common_1.HttpStatus.ACCEPTED);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.ApiDataResponse)(app_dto_1.AppResponse, { isArray: false, withMeta: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "example", null);
__decorate([
    (0, common_1.Get)('/array'),
    (0, decorators_1.ApiDataResponse)(app_dto_1.AppResponse, { isArray: true, withMeta: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "exampleArray", null);
__decorate([
    (0, common_1.Get)('/paginate'),
    (0, decorators_1.ApiDataResponse)(app_dto_1.AppResponse, { isArray: true, withMeta: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_dto_1.AppRequest]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "examplePaginate", null);
__decorate([
    (0, common_1.Get)('/null'),
    (0, decorators_1.ApiDataResponse)(null),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "exampleNull", null);
__decorate([
    (0, common_1.Get)('/error'),
    (0, decorators_1.ApiDataResponse)(null),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testError", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiExtraModels)(app_dto_1.AppResponse),
    __metadata("design:paramtypes", [app_service_1.AppService, logger_port_1.LoggerPort])
], AppController);
//# sourceMappingURL=app.controller.js.map