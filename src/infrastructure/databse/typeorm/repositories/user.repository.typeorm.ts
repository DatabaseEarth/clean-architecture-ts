import { IUserRepository } from '@/domain/user/repositories/user.repository';
import { User } from '@/domain/user/entities/user';
import { AppDataSource } from '../data-source';
import { UserEntity } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';

export class UserRepositoryTypeORM implements IUserRepository {
    private repository: Repository<UserEntity>;
    constructor(dataSource: DataSource = AppDataSource) {
        this.repository = dataSource.getRepository(UserEntity)
    }

    async findByEmail(email: string): Promise<User | null> {
        const entity = await this.repository.findOne({ where: { email } });
        if (!entity) return null;
        return new User(entity.id, entity.email, entity.phone, entity.password, entity.fullName);
    }

    async findById(id: string): Promise<User | null> {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity) return null;
        return new User(entity.id, entity.email, entity.phone, entity.password, entity.fullName);
    }

    async save(user: User): Promise<User> {
        const entity = this.repository.create(user);
        await this.repository.save(entity);
        return user;
    }
}
