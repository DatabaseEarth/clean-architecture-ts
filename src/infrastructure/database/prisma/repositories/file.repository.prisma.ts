import { IFileRepository } from "@/domain/file/repositories";
import { File } from "@/domain/file/entities";
import { FileMapper } from "../mappers/file.mapper";
import { FileType, FileStatus, StorageProvider } from "@/domain/file/enums";
import { PrismaClient } from "@prisma/client";

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

  async findByEntity(entityType: string, entityId: string): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        entityType: entityType,
        entityId: entityId,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
    return entities.map(FileMapper.toDomain);
  }

  async findByType(
    entityType: string,
    entityId: string,
    type: FileType
  ): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        entityType: entityType,
        entityId: entityId,
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

  async findByEntityAndType(
    entityType: string,
    entityId: string,
    type: FileType
  ): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        entityType: entityType,
        entityId: entityId,
        type: type as FileType,
        status: FileStatus.ACTIVE,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
    return entities.map(FileMapper.toDomain);
  }

  async findActiveByEntity(
    entityType: string,
    entityId: string
  ): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        entityType: entityType,
        entityId: entityId,
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

  // New methods for enhanced functionality
  async findByStorageProvider(
    storageProvider: StorageProvider
  ): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        storageProvider: storageProvider,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
    return entities.map(FileMapper.toDomain);
  }

  async findByExtension(extension: string): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        extension: extension,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
    return entities.map(FileMapper.toDomain);
  }

  async findByEntityAndStorageProvider(
    entityType: string,
    entityId: string,
    storageProvider: StorageProvider
  ): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        entityType: entityType,
        entityId: entityId,
        storageProvider: storageProvider,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
    return entities.map(FileMapper.toDomain);
  }

  async findFilesWithoutEntity(): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        entityType: null,
        entityId: null,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
    return entities.map(FileMapper.toDomain);
  }

  async findByEntityAndExtension(
    entityType: string,
    entityId: string,
    extension: string
  ): Promise<File[]> {
    const entities = await this.prisma.file.findMany({
      where: {
        entityType: entityType,
        entityId: entityId,
        extension: extension,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
    return entities.map(FileMapper.toDomain);
  }
}
