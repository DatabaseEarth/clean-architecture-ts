import { IRefreshTokenRepository } from "@/domain/auth/repositories";
import { RefreshToken } from "@/domain/auth/entities";
import { DataSource, Repository } from "typeorm";
import { RefreshTokenEntity } from "../entities/refresh-token.entity";
import { AppDataSource } from "../data-source";
import { RefreshTokenMapper } from "../mappers";

export class RefreshTokenRepositoryTypeORM implements IRefreshTokenRepository {
  private repository: Repository<RefreshTokenEntity>;
  constructor(dataSource: DataSource = AppDataSource) {
    this.repository = dataSource.getRepository(RefreshTokenEntity);
  }

  async save(token: RefreshToken): Promise<RefreshToken> {
    const entity = this.repository.create(RefreshTokenMapper.toEntity(token));
    const saved = await this.repository.save(entity);
    return RefreshTokenMapper.toDomain(saved);
  }

  async update(token: RefreshToken): Promise<RefreshToken> {
    const entity = RefreshTokenMapper.toEntity(token);
    const updated = await this.repository.save(entity);
    return RefreshTokenMapper.toDomain(updated);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const entity = await this.repository.findOne({ where: { token } });
    return entity ? RefreshTokenMapper.toDomain(entity) : null;
  }

  async getRefreshTokenBySessionId(
    sessionId: string
  ): Promise<RefreshToken | null> {
    const entity = await this.repository.findOne({ where: { sessionId } });
    return entity ? RefreshTokenMapper.toDomain(entity) : null;
  }

  async deleteBySessionId(sessionId: string): Promise<void> {
    await this.repository.delete({ sessionId });
  }
}
