import { StringValue } from "ms";
import jwt, { SignOptions } from "jsonwebtoken";
import { ITokenService } from "@/application/ports/security/token.port";
import { ConfigPort } from "@/application/ports/config";
import { EnvConfigService } from "@/infrastructure/config/joi";

export class JwtTokenService implements ITokenService {
  private readonly config: ConfigPort;
  private readonly secret: string;
  private readonly expiresIn: StringValue | number;
  constructor(config: ConfigPort = new EnvConfigService()) {
    this.config = config;
    this.secret = this.config.get<string>("AUTH_SECRET");
    this.expiresIn = this.config.get<StringValue | number>(
      "AUTH_ACCESS_TOKEN_EXPIRES"
    );
  }

  async sign(
    payload: Record<string, any>,
    expiresIn?: StringValue | number
  ): Promise<string> {
    const options: SignOptions = { expiresIn: expiresIn ?? this.expiresIn };

    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.secret, options, (err, token) => {
        if (err || !token) {
          return reject(err);
        }
        resolve(token);
      });
    });
  }

  async verify(token: string): Promise<Record<string, any> | null> {
    return new Promise((resolve) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as Record<string, any>);
      });
    });
  }
}
