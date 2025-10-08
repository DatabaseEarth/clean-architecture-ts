import { StringValue } from "ms";
import jwt, { SignOptions } from "jsonwebtoken";
import { ITokenService } from "@/application/ports/security/token.port";

export class JwtTokenService implements ITokenService {
    constructor(
        private readonly secret: string,
        private readonly expiresIn: StringValue | number
    ) { }

    async sign(payload: Record<string, any>, expiresIn?: StringValue | number): Promise<string> {
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
