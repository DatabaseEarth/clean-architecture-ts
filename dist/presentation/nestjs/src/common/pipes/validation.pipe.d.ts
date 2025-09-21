import { HttpException, ValidationError } from '@nestjs/common';
export interface IValidationErrors {
    [field: string]: string[];
}
export declare class ValidationException extends HttpException {
    constructor(errors: ValidationError[]);
}
//# sourceMappingURL=validation.pipe.d.ts.map