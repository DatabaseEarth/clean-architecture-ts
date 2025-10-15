import { IRefreshTokenRepository } from "@/domain/auth/repositories";
import { RefreshToken } from "@/domain/auth/entities";
import { PrismaClient } from "@prisma/client";
import { RefreshTokenMapper } from "../mappers";

export class RefreshTokenRepositoryPrisma implements IRefreshTokenRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient ?? new PrismaClient();
  }

  async save(token: RefreshToken): Promise<RefreshToken> {
    const entity = await this.prisma.refreshToken.create({
      data: RefreshTokenMapper.toEntity(token),
    });
    return RefreshTokenMapper.toDomain(entity);
  }

  async update(token: RefreshToken): Promise<RefreshToken> {
    const entity = await this.prisma.refreshToken.update({
      where: { id: token.id },
      data: {
        ...RefreshTokenMapper.toEntity(token),
        updatedAt: new Date(),
      },
    });
    return RefreshTokenMapper.toDomain(entity);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const entity = await this.prisma.refreshToken.findFirst({
      where: { token, deletedAt: null },
    });
    return entity ? RefreshTokenMapper.toDomain(entity) : null;
  }

  async getRefreshTokenBySessionId(
    sessionId: string
  ): Promise<RefreshToken | null> {
    const entity = await this.prisma.refreshToken.findFirst({
      where: { sessionId, deletedAt: null },
    });
    return entity ? RefreshTokenMapper.toDomain(entity) : null;
  }

  async deleteBySessionId(sessionId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { sessionId },
      data: { deletedAt: new Date() },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.refreshToken.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findByUserId(userId: string): Promise<RefreshToken[]> {
    const entities = await this.prisma.refreshToken.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return entities.map(RefreshTokenMapper.toDomain);
  }
}
