import { Dayjs } from 'dayjs';
export type IDateTime = Dayjs;
/**
 * Helper khởi tạo object IDateTime từ bất cứ input nào
 */
export declare const dateTime: (input?: string | number | Date, tz?: string) => IDateTime;
/**
 * Trả về thời điểm hiện tại (UTC hoặc theo timezone)
 */
export declare const now: (tz?: string) => IDateTime;
/**
 * Parse từ string theo format
 */
export declare const parse: (dateStr: string, format: string, tz?: string) => IDateTime;
//# sourceMappingURL=date-time.d.ts.map