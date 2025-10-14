import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { EnvConfigService } from "@/infrastructure/config/joi";
import * as schema from "./schema";

const config = new EnvConfigService();

export const pool = new Pool({
  host: config.get("DB_HOST"),
  port: config.get<number>("DB_PORT"),
  user: config.get("DB_USERNAME"),
  password: config.get("DB_PASSWORD"),
  database: config.get("DB_DATABASE"),
  ssl: false,
});

export const db = drizzle(pool, { schema });
