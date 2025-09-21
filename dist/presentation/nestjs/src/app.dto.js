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
exports.AppResponse = exports.AppRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
class AppRequest {
    constructor() {
        this.page = 1;
        this.size = 10;
    }
}
exports.AppRequest = AppRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'page', type: 'number' }),
    __metadata("design:type", Number)
], AppRequest.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'size', type: 'number' }),
    __metadata("design:type", Number)
], AppRequest.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'query', type: 'string' }),
    __metadata("design:type", String)
], AppRequest.prototype, "query", void 0);
class AppResponse {
}
exports.AppResponse = AppResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'port', type: 'number' }),
    __metadata("design:type", Number)
], AppResponse.prototype, "port", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'host', type: 'string' }),
    __metadata("design:type", String)
], AppResponse.prototype, "host", void 0);
//# sourceMappingURL=app.dto.js.map