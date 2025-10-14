import * as dotenv from "dotenv";
import * as Joi from "joi";
import { ConfigPort } from "@/application/ports/config";
import { BaseException } from "@/shared-kernel/exceptions";
import { ErrorCode } from "@/shared-kernel/enums/exception.enum";

// Load .env
dotenv.config();

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),

  APP_PORT: Joi.number().default(3000),
  APP_HOST: Joi.string().default("localhost"),
  APP_API_DOCUMENT: Joi.boolean().default(false),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SYNC: Joi.boolean().default(false),
  DATABASE_URL: Joi.string().optional(),

  REDIS_HOST: Joi.string().default("localhost"),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_USERNAME: Joi.string().allow("").default(""),
  REDIS_PASSWORD: Joi.string().allow("").default(""),

  AUTH_SECRET: Joi.string().required(),
  AUTH_ACCESS_TOKEN_EXPIRES: Joi.string().default("15m"),
  AUTH_REFRESH_TOKEN_EXPIRES: Joi.string().default("7d"),
}).unknown();

const { error, value: envVars } = schema.validate(process.env);

if (error) {
  throw new BaseException({
    code: ErrorCode.VALIDATION_ERROR,
    message: `Config validation error: ${error.message}`
  });
}

export class EnvConfigService implements ConfigPort {
  private readonly env: Record<string, any>;

  constructor() {
    this.env = envVars;
  }

  get<T = any>(key: string, defaultValue?: T): T {
    return (this.env[key] ?? defaultValue) as T;
  }
}
