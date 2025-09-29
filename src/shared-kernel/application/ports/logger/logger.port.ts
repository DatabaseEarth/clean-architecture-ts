export interface LoggerPort {
  log(message: any, ...optionalParams: any[]): void;
  info(message: string): void;
  error(message: string, trace?: string): void;
  warn(message: string): void;
  debug(message: string): void;
}
