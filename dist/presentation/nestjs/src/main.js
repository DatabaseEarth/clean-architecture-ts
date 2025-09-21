"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_1 = require("./swagger");
const compression_1 = __importDefault(require("compression"));
const env_1 = require("./common/utils/env");
require("reflect-metadata");
const logger_port_1 = require("../../../application/common/ports/logger.port");
const config_port_1 = require("../../../application/common/ports/config.port");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
        logger: (0, env_1.isProduction)()
            ? ['log', 'error']
            : ['log', 'error', 'warn', 'debug', 'verbose'],
    });
    const configService = app.get(config_port_1.ConfigPort);
    const loggerService = app.get(logger_port_1.LoggerPort);
    app.useLogger(app.get(logger_port_1.LoggerPort));
    app.use((0, compression_1.default)());
    app.enableCors({
        origin: true, // 'http://localhost:5173'
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)());
    app.setGlobalPrefix('api');
    app.use((0, helmet_1.default)({
        xssFilter: true,
        hidePoweredBy: true,
    }));
    app.useBodyParser('json', { limit: '50mb' });
    app.useBodyParser('urlencoded', { extended: true, limit: '50mb' });
    (0, swagger_1.createSwaggerDocument)(app);
    const port = configService.get('APP_PORT');
    const host = configService.get('APP_HOST');
    await app.listen(port, host, () => {
        loggerService.info(`Application listen in ${port}`);
    });
}
//# sourceMappingURL=main.js.map