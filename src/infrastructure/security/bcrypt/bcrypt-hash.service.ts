import bcrypt from 'bcrypt';
import { IHashService } from '@/shared-kernel/application/ports/security/hash.port';

export class BcryptHashService implements IHashService {
    async hash(value: string, salt: number = 10): Promise<string> {
        return bcrypt.hash(value, salt);
    }
    async compare(value: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(value, hashed);
    }
}