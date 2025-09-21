"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
const env_config_1 = require("../../config/joi/env.config");
const config = new env_config_1.EnvConfigService();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: config.get("DB_HOST"),
    port: config.get("DB_PORT"),
    username: config.get("DB_USERNAME"),
    password: config.get("DB_PASSWORD"),
    database: config.get("DB_DATABASE"),
    entities: [...entities_1.entities],
    synchronize: false,
    logging: false,
});
//# sourceMappingURL=data-source.js.map