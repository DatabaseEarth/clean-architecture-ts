"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infrastructure = void 0;
// import { CacheModule } from './cache';
const config_1 = require("./config");
const logger_1 = require("./logger");
exports.infrastructure = [logger_1.LoggerModule, config_1.ConfigModule]; // , CacheModule
//# sourceMappingURL=index.js.map