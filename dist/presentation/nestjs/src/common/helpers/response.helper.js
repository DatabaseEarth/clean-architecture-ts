"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
const class_transformer_1 = require("class-transformer");
exports.formatResponse = {
    single(dto, data = null, message = 'Thành công') {
        const transformedData = dto && data
            ? (0, class_transformer_1.plainToInstance)(dto, data, {
                excludeExtraneousValues: true,
            })
            : null;
        return {
            status: 'success',
            message,
            data: (0, class_transformer_1.instanceToPlain)(transformedData),
        };
    },
    array(dto, data, message = 'Thành công') {
        const transformedData = (0, class_transformer_1.plainToInstance)(dto, data, {
            excludeExtraneousValues: true,
        });
        return {
            status: 'success',
            message,
            data: (0, class_transformer_1.instanceToPlain)(transformedData),
        };
    },
    paginate(dto, data, message = 'Thành công', page, size) {
        const transformedData = (0, class_transformer_1.plainToInstance)(dto, data, {
            excludeExtraneousValues: true,
        });
        const totalItems = data.length;
        const meta = {
            totalItems,
            itemCount: Math.min(size, totalItems),
            itemsPerPage: size,
            totalPages: Math.ceil(totalItems / size),
            currentPage: page,
        };
        return {
            status: 'success',
            data: (0, class_transformer_1.instanceToPlain)(transformedData),
            message,
            meta,
        };
    },
};
//# sourceMappingURL=response.helper.js.map