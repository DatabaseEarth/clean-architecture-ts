import { ConfigPort } from "@/application/ports/config";
import { LoggerPort } from "@/application/ports/logger/logger.port";
import { EnvConfigService } from "@/infrastructure/config/joi";
import pino, { Logger } from "pino";

export class PinoLoggerService implements LoggerPort {
  private readonly logger: Logger;
  private readonly config: ConfigPort;

  constructor(config: ConfigPort = new EnvConfigService()) {
    this.config = config;
    const isProd = this.config.get<string>("NODE_ENV") === "production";
    this.logger = pino(
      isProd
        ? {
            level: this.config.get<string>("LOG_LEVEL") || "info",
            transport: {
              target: "pino-roll",
              options: {
                file: `logs/app-${new Date().toISOString().split("T")[0]}.log`,
                frequency: "daily",
                compress: "gzip",
                mkdir: true,
                limit: { count: 7 },
              },
            },
          }
        : {
            level: this.config.get<string>("LOG_LEVEL") || "debug",
            transport: {
              target: "pino-pretty",
              options: {
                colorize: true,
                singleLine: false,
                translateTime: "yyyy-mm-dd HH:MM:ss",
              },
            },
          }
    );
  }

  log(message: string) {
    this.logger.info(message);
  }

  info(message: string) {
    this.logger.info(message);
  }
  error(message: string, trace?: string) {
    this.logger.error({ trace }, message);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
}
