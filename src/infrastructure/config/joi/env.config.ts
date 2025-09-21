import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { ConfigPort } from '@/application/common/ports/config.port';

// Load .env
dotenv.config();

const schema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),

    APP_PORT: Joi.number().default(3000),
    APP_HOST: Joi.string().default('localhost'),
    APP_API_DOCUMENT: Joi.boolean().default(false),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),

    AUTH_SECRET: Joi.string().required(),
}).unknown();

const { error, value: envVars } = schema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
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
