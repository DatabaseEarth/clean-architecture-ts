import { File } from "@/domain/file/entities";
import { File as PrismaFile } from "@prisma/client";
import { FileType, FileStatus, StorageProvider } from "@/domain/file/enums";

export class FileMapper {
  static toDomain(entity: PrismaFile): File {
    return new File(
      entity.id,
      entity.originalName,
      entity.fileName,
      entity.mimeType,
      Number(entity.size),
      entity.path,
      entity.url,
      entity.type as FileType,
      entity.status as FileStatus,
      entity.entityType,
      entity.entityId,
      entity.extension,
      entity.storageProvider as StorageProvider,
      (entity.metadata as Record<string, any>) || {},
      entity.createdAt,
      entity.createdBy || undefined
    );
  }

  static toEntity(
    domain: File
  ): Omit<PrismaFile, "user_files" | "user_avatar"> {
    return {
      id: domain.id,
      originalName: domain.originalName,
      fileName: domain.fileName,
      mimeType: domain.mimeType,
      size: BigInt(domain.size),
      path: domain.path,
      url: domain.url,
      type: domain.type,
      status: domain.status,
      entityType: domain.entityType,
      entityId: domain.entityId,
      extension: domain.extension,
      storageProvider: domain.storageProvider as string,
      metadata: domain.metadata || null,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt || null,
      createdBy: domain.createdBy || null,
      updatedBy: domain.updatedBy || null,
      deletedBy: domain.deletedBy || null,
    };
  }
}
