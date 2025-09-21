"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMessage = void 0;
exports.validateMessage = {
    required: (fieldName) => `${fieldName} không được trống.`,
    email: (fieldName) => `${fieldName} phải là một địa chỉ email hợp lệ.`,
    uuid: (fieldName) => `${fieldName} phải một chuỗi UUID hợp lệ.`,
    string: (fieldName) => `${fieldName} phải là một chuỗi kí tự.`,
    length: (fieldName, from, to) => `${fieldName} phải là một chuỗi kí tự từ ${from} đến ${to}.`,
    url: (fieldName) => `${fieldName} phải là một đường dẫn hợp lệ.`,
    array: (fieldName) => `${fieldName} phải là một mảng.`,
    number: (fieldName) => `${fieldName} phải là một số.`,
    boolean: (fieldName) => `${fieldName} phải là boolean.`,
    invalid: (fieldName) => `${fieldName} không hợp lệ.`,
    dateFormat: (fieldName, dateFormat) => `${fieldName} không hợp lệ (${dateFormat}).`,
    after: (fieldName, date, allowTime) => `${fieldName} là một ngày sau ngày ${typeof date === 'string'
        ? date
        : date.format(allowTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')}.`,
    afterOrEqual: (fieldName, date, allowTime) => `${fieldName} là một ngày sau hoặc bằng ngày ${typeof date === 'string'
        ? date
        : date.format(allowTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')}.`,
    afterNow: (fieldName) => `${fieldName} là một ngày sau hiện tại.`,
    afterOrEqualNow: (fieldName) => `${fieldName} là một ngày sau hoặc bằng hiện tại.`,
    before: (fieldName, date, allowTime) => `${fieldName} là một ngày trước ngày ${typeof date === 'string'
        ? date
        : date.format(allowTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')}.`,
    beforeOrEqual: (fieldName, date, allowTime) => `${fieldName} là một ngày trước hoặc bằng ngày ${typeof date === 'string'
        ? date
        : date.format(allowTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')}.`,
    beforeNow: (fieldName) => `${fieldName} là một ngày trước hiện tại.`,
    beforeOrEqualNow: (fieldName) => `${fieldName} là một ngày trước hoặc bằng hiện tại.`,
    min: {
        array: (fieldName, min) => `${fieldName} tối thiểu ${min} phần tử.`,
        string: (fieldName, min) => `${fieldName} tối thiểu ${min} ký tự.`,
        number: (fieldName, min) => `${fieldName} nhỏ nhất là ${min}.`,
    },
    max: {
        array: (fieldName, max) => `${fieldName} tối đa ${max} phần tử.`,
        string: (fieldName, max) => `${fieldName} không được lớn hơn ${max} ký tự.`,
        number: (fieldName, max) => `${fieldName} không được lớn hơn ${max}.`,
    },
    exists: (fieldName) => `${fieldName} không tồn tại.`,
    unique: (fieldName) => `${fieldName} đã tồn tại.`,
    fileTypeNotCorrect: (fieldName, types) => `${fieldName} phải là một tập tin có định dạng: ${types.join(', ')}`,
};
//# sourceMappingURL=validate.helper.js.map