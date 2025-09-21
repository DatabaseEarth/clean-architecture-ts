"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            // Nếu data đã null, trả thẳng để tránh nested object
            if (data === null) {
                return {
                    status: 'success',
                    message: 'Thành công!',
                    data: null,
                };
            }
            // Nếu data có định dạng ApiResponse (single, array, paginate)
            if (data.data !== undefined || data.meta !== undefined) {
                return {
                    status: 'success',
                    message: data.message ?? 'Thành công!',
                    data: data.data ?? null,
                    meta: data.meta ?? undefined,
                };
            }
            // Trường hợp khác: trả trực tiếp
            return {
                status: 'success',
                message: data.message ?? 'Thành công!',
                data,
            };
        }), (0, operators_1.catchError)((err) => (0, rxjs_1.throwError)(() => err)));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
//# sourceMappingURL=transform.interceptor.js.map