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
exports.ApiDataResponse = exports.DataResponse = exports.DataMetaData = void 0;
exports.getSwaggerSchema = getSwaggerSchema;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
class DataMetaData {
    constructor(meta) {
        if (meta) {
            this.totalItems = meta.totalItems;
            this.itemCount = meta.itemCount;
            this.itemsPerPage = meta.itemsPerPage;
            this.totalPages = meta.totalPages;
            this.currentPage = meta.currentPage;
        }
    }
}
exports.DataMetaData = DataMetaData;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng số item' }),
    __metadata("design:type", Number)
], DataMetaData.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số item trả về trong trang hiện tại' }),
    __metadata("design:type", Number)
], DataMetaData.prototype, "itemCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số item trên mỗi trang' }),
    __metadata("design:type", Number)
], DataMetaData.prototype, "itemsPerPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng số trang' }),
    __metadata("design:type", Number)
], DataMetaData.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trang hiện tại' }),
    __metadata("design:type", Number)
], DataMetaData.prototype, "currentPage", void 0);
class DataResponse {
    constructor(data, message) {
        this.data = data ?? null;
        this.message = message || 'Thành công!';
    }
}
exports.DataResponse = DataResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái trả về' }),
    __metadata("design:type", String)
], DataResponse.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dữ liệu phản hồi' }),
    __metadata("design:type", Object)
], DataResponse.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông báo liên quan đến phản hồi',
        required: false,
    }),
    __metadata("design:type", String)
], DataResponse.prototype, "message", void 0);
function getSwaggerSchema(type, isArray = false) {
    let schema;
    switch (true) {
        case !type:
            schema = { nullable: true, default: null };
            break;
        case type === String:
            schema = { type: 'string' };
            break;
        case type === Number:
            schema = { type: 'number' };
            break;
        case type === Boolean:
            schema = { type: 'boolean' };
            break;
        case !!type.enum:
            schema = { enum: type.enum };
            break;
        default:
            schema = { $ref: (0, swagger_1.getSchemaPath)(type) };
    }
    if (isArray)
        schema = { type: 'array', items: schema };
    return schema;
}
const ApiDataResponse = (data, options, additionProp) => {
    const responseClass = DataResponse;
    const properties = {};
    properties.data = getSwaggerSchema(data, options?.isArray);
    if (options?.withMeta)
        properties.meta = { $ref: (0, swagger_1.getSchemaPath)(DataMetaData) };
    if (additionProp)
        Object.assign(properties, additionProp);
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [{ $ref: (0, swagger_1.getSchemaPath)(responseClass) }, { properties }],
        },
    }));
};
exports.ApiDataResponse = ApiDataResponse;
//# sourceMappingURL=response.decorator.js.map