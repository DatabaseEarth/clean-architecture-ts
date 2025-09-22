import bcrypt from 'bcrypt';
import { IHashService } from '@/application/security/services/hash.service';

export class BcryptHashService implements IHashService {
    async hash(value: string, salt: number = 10): Promise<string> {
        return bcrypt.hash(value, salt);
    }
    async compare(value: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(value, hashed);
    }
}