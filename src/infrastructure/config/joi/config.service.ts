import { IConfigPort } from "@/application/ports";

export class ConfigService implements IConfigPort {
  get<T>(key: string, defaultValue?: T): T | undefined {
    const value = process.env[key];
    if (!value) return defaultValue;

    // Try to parse as JSON first (for objects/arrays)
    try {
      return JSON.parse(value) as T;
    } catch {
      // If not JSON, return as string and let TypeScript handle the conversion
      return value as T;
    }
  }
}
