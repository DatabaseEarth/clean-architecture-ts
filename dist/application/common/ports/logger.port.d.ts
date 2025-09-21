export declare abstract class LoggerPort {
    abstract log(message: any, ...optionalParams: any[]): void;
    abstract info(message: string): void;
    abstract error(message: string, trace?: string): void;
    abstract warn(message: string): void;
    abstract debug(message: string): void;
}
//# sourceMappingURL=logger.port.d.ts.map