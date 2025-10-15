import { Injectable } from "@nestjs/common";
import { IFileRepository } from "@/domain/file/repositories";
import { File } from "@/domain/file/entities";
import { FileMapper } from "../mappers/file.mapper";
import { FileType, FileStatus } from "@/domain/file/enums";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class FileRepositoryPrisma implements IFileRepository {
  private prisma: PrismaClient;
  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient ?? new PrismaClient();
  }

  async save(file: File): Promise<File> {
    const entity = FileMapper.toEntity(file);
    const saved = await this.prisma.file.create({
      data: entity,
    });
    return FileMapper.toDomain(saved);
  }

  async findById(id: string): Promise<File | null> {
    const entity = await this.prisma.file.findUnique({
      where: { id },
    });
    return entity ? FileMapper.toDomain(entity) : null;
  }

  async findByOwner(ownerType: string, ownerId: string): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        ownerType: ownerType,
        ownerId: ownerId,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
    return entities.map(FileMapper.toDomain);
  }

  async findByType(
    ownerType: string,
    ownerId: string,
    type: FileType
  ): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        ownerType: ownerType,
        ownerId: ownerId,
        type: type as FileType,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
    return entities.map(FileMapper.toDomain);
  }

  async findByPath(path: string): Promise<File | null> {
    const entity = await this.prisma.file.findFirst({
      where: { path },
    });
    return entity ? FileMapper.toDomain(entity) : null;
  }

  async findByUrl(url: string): Promise<File | null> {
    const entity = await this.prisma.file.findFirst({
      where: { url },
    });
    return entity ? FileMapper.toDomain(entity) : null;
  }

  async update(file: File): Promise<File> {
    const entity = FileMapper.toEntity(file);
    const updated = await this.prisma.file.update({
      where: { id: file.id },
      data: {
        ...entity,
        updatedAt: new Date(),
      },
    });
    return FileMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.file.delete({
      where: { id },
    });
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.prisma.file.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: deletedBy,
        status: FileStatus.DELETED,
      },
    });
  }

  async findByOwnerAndType(
    ownerType: string,
    ownerId: string,
    type: FileType
  ): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        ownerType: ownerType,
        ownerId: ownerId,
        type: type as FileType,
        status: FileStatus.ACTIVE,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
    return entities.map(FileMapper.toDomain);
  }

  async findActiveByOwner(ownerType: string, ownerId: string): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        ownerType: ownerType,
        ownerId: ownerId,
        status: FileStatus.ACTIVE,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
    return entities.map(FileMapper.toDomain);
  }

  async findOrphanedFiles(olderThan: Date): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        createdAt: { lt: olderThan },
        status: FileStatus.PROCESSING,
        deletedAt: null,
      },
    });
    return entities.map(FileMapper.toDomain);
  }
}
