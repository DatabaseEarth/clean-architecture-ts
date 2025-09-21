import { ApiSuccessResponse, MetaData } from '../interfaces/response.interface';
import { Type } from '@nestjs/common';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
export declare class DataMetaData implements MetaData {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    constructor(meta?: Partial<MetaData>);
}
export declare class DataResponse<T> implements ApiSuccessResponse<T> {
    status: 'success' | 'oke';
    data: T | T[] | null;
    message: string;
    constructor(data?: T | T[] | null, message?: string);
}
export declare function getSwaggerSchema(type: any, isArray?: boolean): SchemaObject | ReferenceObject;
type ApiDataResponseOptions = {
    isArray: true;
    withMeta?: boolean;
} | {
    isArray?: false;
    withMeta?: false;
};
export declare const ApiDataResponse: <Data extends Type<unknown> | null = null>(data?: Data, options?: ApiDataResponseOptions, additionProp?: Record<string, SchemaObject | ReferenceObject>) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
//# sourceMappingURL=response.decorator.d.ts.map