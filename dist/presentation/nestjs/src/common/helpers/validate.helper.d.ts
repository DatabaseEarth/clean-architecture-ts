import { IDateTime } from '../utils/date-time';
export declare const validateMessage: {
    required: (fieldName: string) => string;
    email: (fieldName: string) => string;
    uuid: (fieldName: string) => string;
    string: (fieldName: string) => string;
    length: (fieldName: string, from: number, to: number) => string;
    url: (fieldName: string) => string;
    array: (fieldName: string) => string;
    number: (fieldName: string) => string;
    boolean: (fieldName: string) => string;
    invalid: (fieldName: string) => string;
    dateFormat: (fieldName: string, dateFormat: any) => string;
    after: (fieldName: string, date: IDateTime | string, allowTime?: boolean) => string;
    afterOrEqual: (fieldName: string, date: IDateTime | string, allowTime?: boolean) => string;
    afterNow: (fieldName: string) => string;
    afterOrEqualNow: (fieldName: string) => string;
    before: (fieldName: string, date: IDateTime | string, allowTime?: boolean) => string;
    beforeOrEqual: (fieldName: string, date: IDateTime | string, allowTime?: boolean) => string;
    beforeNow: (fieldName: string) => string;
    beforeOrEqualNow: (fieldName: string) => string;
    min: {
        array: (fieldName: string, min: number) => string;
        string: (fieldName: string, min: number) => string;
        number: (fieldName: string, min: number) => string;
    };
    max: {
        array: (fieldName: string, max: number) => string;
        string: (fieldName: string, max: number) => string;
        number: (fieldName: string, max: number) => string;
    };
    exists: (fieldName: string) => string;
    unique: (fieldName: string) => string;
    fileTypeNotCorrect: (fieldName: string, types: string[]) => string;
};
//# sourceMappingURL=validate.helper.d.ts.map