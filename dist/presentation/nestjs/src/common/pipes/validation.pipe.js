"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const common_1 = require("@nestjs/common");
const buildValidationErrors = (errors, parentProperty = '') => {
    return errors.reduce((acc, err) => {
        const propertyPath = parentProperty
            ? `${parentProperty}.${err.property}`
            : err.property;
        if (err.constraints)
            acc[propertyPath] = Object.values(err.constraints);
        if (err.children && err.children.length > 0)
            Object.assign(acc, buildValidationErrors(err.children, propertyPath));
        return acc;
    }, {});
};
class ValidationException extends common_1.HttpException {
    constructor(errors) {
        const formattedErrors = buildValidationErrors(errors);
        const response = {
            status: 'error',
            message: 'Validation failed',
            error_code: 'VALIDATION_ERROR',
            details: formattedErrors,
        };
        super(response, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation.pipe.js.map