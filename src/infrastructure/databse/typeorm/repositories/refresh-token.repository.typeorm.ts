import { IRefreshTokenRepository } from "@/domain/auth/repositories/refresh-token.repository";
import { RefreshToken } from "@/domain/auth/entities/refresh-token";
import { DataSource, Repository } from "typeorm";
import { RefreshTokenEntity } from "../entities/refresh-token.entity";
import { AppDataSource } from "../data-source";
import { RefreshTokenMapper } from "../mappers/refresh-token.mapper";

export class RefreshTokenRepositoryTypeORM implements IRefreshTokenRepository {
    private repository: Repository<RefreshTokenEntity>;
    constructor(
        dataSource: DataSource = AppDataSource
    ) { this.repository = dataSource.getRepository(RefreshTokenEntity) }

    async save(token: RefreshToken): Promise<RefreshToken> {
        const entity = this.repository.create(RefreshTokenMapper.toEntity(token));
        const saved = await this.repository.save(entity);
        return RefreshTokenMapper.toDomain(saved);
    }

    async findByToken(token: string): Promise<RefreshToken | null> {
        const entity = await this.repository.findOne({ where: { token } });
        return entity ? RefreshTokenMapper.toDomain(entity) : null;
    }

    async deleteBySessionId(sessionId: string): Promise<void> {
        await this.repository.delete({ sessionId });
    }
}
