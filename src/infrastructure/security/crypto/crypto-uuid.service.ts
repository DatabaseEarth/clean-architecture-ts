import crypto from 'crypto';
import { IUuidService } from '@/application/security/services/uuid.service';

export class CryptoUuidService implements IUuidService {
    generate(): string {
        return crypto.randomUUID();
    }
}