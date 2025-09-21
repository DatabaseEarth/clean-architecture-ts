import "reflect-metadata"
import { DataSource } from "typeorm"
import { entities } from "./entities"
import { EnvConfigService } from "@/infrastructure/config/joi/env.config";

const config = new EnvConfigService();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.get("DB_HOST"),
    port: config.get<number>("DB_PORT"),
    username: config.get("DB_USERNAME"),
    password: config.get("DB_PASSWORD"),
    database: config.get("DB_DATABASE"),
    entities: [...entities],
    synchronize: false,
    logging: false,
})