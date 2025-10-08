import { LoggerPort } from "@/application/ports/logger/logger.port";
import pino from "pino";

export class PinoLoggerService implements LoggerPort {
  private readonly logger;

  constructor() {
    const isProd = process.env.NODE_ENV === "production";
    this.logger = pino(
      isProd
        ? {
            level: process.env.LOG_LEVEL || "info",
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
            level: "debug",
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
