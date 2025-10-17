import bcrypt from "bcrypt";
import { IHashService } from "@/application/ports/security";
import { ConfigPort } from "@/application/ports/config";
import { EnvConfigService } from "@/infrastructure/config/joi";

export class BcryptHashService implements IHashService {
  private readonly config: ConfigPort;
  constructor(config: ConfigPort = new EnvConfigService()) {
    this.config = config;
  }
  async hash(value: string): Promise<string> {
    return bcrypt.hash(
      value,
      this.config.get<number>("BCRYPT_SALT_ROUNDS") ?? 10
    );
  }
  async compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
  }
}
