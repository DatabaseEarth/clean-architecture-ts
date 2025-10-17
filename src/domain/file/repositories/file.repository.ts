import { File } from "../entities";
import { StorageProvider } from "../enums";

export interface IFileRepository {
  save(file: File): Promise<File>;
  findById(id: string): Promise<File | null>;
  findByEntity(entityType: string, entityId: string): Promise<File[]>;
  findByType(
    entityType: string,
    entityId: string,
    type: string
  ): Promise<File[]>;
  findByPath(path: string): Promise<File | null>;
  findByUrl(url: string): Promise<File | null>;
  update(file: File): Promise<File>;
  delete(id: string): Promise<void>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
  findByEntityAndType(
    entityType: string,
    entityId: string,
    type: string
  ): Promise<File[]>;
  findActiveByEntity(entityType: string, entityId: string): Promise<File[]>;
  findOrphanedFiles(olderThan: Date): Promise<File[]>;
  findByStorageProvider(storageProvider: StorageProvider): Promise<File[]>;
  findByExtension(extension: string): Promise<File[]>;
  findByEntityAndStorageProvider(
    entityType: string,
    entityId: string,
    storageProvider: StorageProvider
  ): Promise<File[]>;
  findFilesWithoutEntity(): Promise<File[]>;
  findByEntityAndExtension(
    entityType: string,
    entityId: string,
    extension: string
  ): Promise<File[]>;
}
