"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.now = exports.dateTime = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
const isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
const isLeapYear_1 = __importDefault(require("dayjs/plugin/isLeapYear"));
const isoWeeksInYear_1 = __importDefault(require("dayjs/plugin/isoWeeksInYear"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const weekday_1 = __importDefault(require("dayjs/plugin/weekday"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(customParseFormat_1.default);
dayjs_1.default.extend(isBetween_1.default);
dayjs_1.default.extend(isSameOrAfter_1.default);
dayjs_1.default.extend(isSameOrBefore_1.default);
dayjs_1.default.extend(weekday_1.default);
dayjs_1.default.extend(isoWeeksInYear_1.default);
dayjs_1.default.extend(isLeapYear_1.default);
/**
 * Helper khởi tạo object IDateTime từ bất cứ input nào
 */
const dateTime = (input, tz) => {
    if (tz) {
        return (0, dayjs_1.default)(input).tz(tz);
    }
    return (0, dayjs_1.default)(input);
};
exports.dateTime = dateTime;
/**
 * Trả về thời điểm hiện tại (UTC hoặc theo timezone)
 */
const now = (tz) => {
    if (tz) {
        return (0, dayjs_1.default)().tz(tz);
    }
    return (0, dayjs_1.default)();
};
exports.now = now;
/**
 * Parse từ string theo format
 */
const parse = (dateStr, format, tz) => {
    if (tz) {
        return dayjs_1.default.tz(dateStr, format, tz);
    }
    return (0, dayjs_1.default)(dateStr, format);
};
exports.parse = parse;
//# sourceMappingURL=date-time.js.map