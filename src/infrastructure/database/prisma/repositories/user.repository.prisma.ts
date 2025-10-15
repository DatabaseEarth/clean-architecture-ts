import { IUserRepository } from "@/domain/user/repositories";
import { User } from "@/domain/user/entities";
import { PrismaClient } from "@prisma/client";
import { UserMapper } from "../mappers";

export class UserRepositoryPrisma implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient ?? new PrismaClient();
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
    if (!entity) return null;
    return UserMapper.toDomain(entity);
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.prisma.user.findFirst({
      where: { id, deletedAt: null },
    });
    if (!entity) return null;
    return UserMapper.toDomain(entity);
  }

  async save(user: User): Promise<User> {
    const entity = await this.prisma.user.create({
      data: UserMapper.toEntity(user),
    });
    return UserMapper.toDomain(entity);
  }

  async update(user: User): Promise<User> {
    const entity = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...UserMapper.toEntity(user),
        updatedAt: new Date(),
      },
    });
    return UserMapper.toDomain(entity);
  }

  async delete(id: string, deletedBy?: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy,
      },
    });
  }

  async findMany(limit: number = 10, offset: number = 0): Promise<User[]> {
    const entities = await this.prisma.user.findMany({
      where: { deletedAt: null },
      take: limit,
      skip: offset,
      orderBy: { createdAt: "desc" },
    });
    return entities.map(UserMapper.toDomain);
  }
}
