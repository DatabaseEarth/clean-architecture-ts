import { BaseEntity } from '../abstracts';
import { UserEntity } from './user.entity';
export declare class RefreshTokenEntity extends BaseEntity {
    userId: string;
    token: string;
    sessionId: string;
    deviceInfo?: string;
    ipAddress?: string;
    user: UserEntity;
}
//# sourceMappingURL=refresh-token.entity.d.ts.map