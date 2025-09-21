import { LoggerPort } from '@/application/common/ports/logger.port';
export declare class PinoLoggerService implements LoggerPort {
    private readonly logger;
    constructor();
    log(message: string): void;
    info(message: string): void;
    error(message: string, trace?: string): void;
    warn(message: string): void;
    debug(message: string): void;
}
//# sourceMappingURL=pino-logger.service.d.ts.map