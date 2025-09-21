"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDevelopment = isDevelopment;
exports.isProduction = isProduction;
const enums_1 = require("../enums");
function isDevelopment() {
    return process.env.NODE_ENV === enums_1.Environment.DEVELOPMENT;
}
function isProduction() {
    return process.env.NODE_ENV === enums_1.Environment.PRODUCTION;
}
//# sourceMappingURL=env.js.map