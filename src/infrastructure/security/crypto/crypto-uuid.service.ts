import crypto from 'crypto';
import { IUuidService } from '@/application/ports/security/uuid.port';

export class CryptoUuidService implements IUuidService {
    generate(): string {
        return crypto.randomUUID();
    }
}