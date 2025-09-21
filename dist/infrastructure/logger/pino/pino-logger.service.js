"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinoLoggerService = void 0;
const pino_1 = __importDefault(require("pino"));
class PinoLoggerService {
    constructor() {
        const isProd = process.env.NODE_ENV === 'production';
        this.logger = (0, pino_1.default)(isProd
            ? {
                level: process.env.LOG_LEVEL || 'info',
                transport: {
                    target: 'pino-roll',
                    options: {
                        file: `logs/app-${new Date().toISOString().split('T')[0]}.log`,
                        frequency: 'daily',
                        compress: 'gzip',
                        mkdir: true,
                        limit: { count: 7 },
                    },
                },
            }
            : {
                level: 'debug',
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        singleLine: false,
                        translateTime: 'yyyy-mm-dd HH:MM:ss',
                    },
                },
            });
    }
    log(message) {
        this.logger.info(message);
    }
    info(message) {
        this.logger.info(message);
    }
    error(message, trace) {
        this.logger.error({ trace }, message);
    }
    warn(message) {
        this.logger.warn(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
}
exports.PinoLoggerService = PinoLoggerService;
//# sourceMappingURL=pino-logger.service.js.map