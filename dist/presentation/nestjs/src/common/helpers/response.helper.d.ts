import { ApiResponse } from '../../common/interfaces';
export declare const formatResponse: {
    single<T>(dto: (new (...args: any[]) => T) | null, data?: any, message?: string): ApiResponse<T | null>;
    array<T>(dto: new (...args: any[]) => T, data: any[], message?: string): ApiResponse<T[]>;
    paginate<T>(dto: new (...args: any[]) => T, data: any[], message: string, page: number, size: number): ApiResponse<T[]>;
};
//# sourceMappingURL=response.helper.d.ts.map