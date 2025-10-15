import { File } from "../entities";
import { Id } from "@/shared-kernel/core";

export interface IFileRepository {
  save(file: File): Promise<File>;
  findById(id: string): Promise<File | null>;
  findByOwner(ownerType: string, ownerId: string): Promise<File[]>;
  findByType(ownerType: string, ownerId: string, type: string): Promise<File[]>;
  findByPath(path: string): Promise<File | null>;
  findByUrl(url: string): Promise<File | null>;
  update(file: File): Promise<File>;
  delete(id: string): Promise<void>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
  findByOwnerAndType(
    ownerType: string,
    ownerId: string,
    type: string
  ): Promise<File[]>;
  findActiveByOwner(ownerType: string, ownerId: string): Promise<File[]>;
  findOrphanedFiles(olderThan: Date): Promise<File[]>;
}
