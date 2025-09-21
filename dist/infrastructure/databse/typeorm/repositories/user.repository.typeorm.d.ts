import { IUserRepository } from '@/domain/user/repositories/user.repository';
import { User } from '@/domain/user/entities/user';
import { DataSource } from 'typeorm';
export declare class UserRepositoryTypeORM implements IUserRepository {
    private repository;
    constructor(dataSource?: DataSource);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    save(user: User): Promise<User>;
}
//# sourceMappingURL=user.repository.typeorm.d.ts.map