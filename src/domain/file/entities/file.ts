import { BaseEntity } from "@/shared-kernel/core";
import { FileType, FileStatus, StorageProvider } from "../enums";

export class File extends BaseEntity {
  private _originalName: string;
  private _fileName: string;
  private _mimeType: string;
  private _size: number;
  private _path: string;
  private _url: string;
  private _type: FileType;
  private _status: FileStatus;
  private _entityType: string | null;
  private _entityId: string | null;
  private _extension: string;
  private _storageProvider: StorageProvider;
  private _metadata?: Record<string, any> | null;

  constructor(
    id: string,
    originalName: string,
    fileName: string,
    mimeType: string,
    size: number,
    path: string,
    url: string,
    type: FileType,
    status: FileStatus,
    entityType: string | null,
    entityId: string | null,
    extension: string,
    storageProvider: StorageProvider,
    metadata?: Record<string, any> | null,
    createdAt?: Date,
    createdBy?: string | null
  ) {
    super(id, createdAt, createdBy);
    this._originalName = originalName;
    this._fileName = fileName;
    this._mimeType = mimeType;
    this._size = size;
    this._path = path;
    this._url = url;
    this._type = type;
    this._status = status;
    this._entityType = entityType;
    this._entityId = entityId;
    this._extension = extension;
    this._storageProvider = storageProvider;
    this._metadata = metadata;
  }

  // Getters
  get originalName(): string {
    return this._originalName;
  }

  get fileName(): string {
    return this._fileName;
  }

  get mimeType(): string {
    return this._mimeType;
  }

  get size(): number {
    return this._size;
  }

  get path(): string {
    return this._path;
  }

  get url(): string {
    return this._url;
  }

  get type(): FileType {
    return this._type;
  }

  get status(): FileStatus {
    return this._status;
  }

  get entityType(): string | null {
    return this._entityType;
  }

  get entityId(): string | null {
    return this._entityId;
  }

  get extension(): string {
    return this._extension;
  }

  get storageProvider(): StorageProvider {
    return this._storageProvider;
  }

  get metadata(): Record<string, any> | null {
    return this._metadata;
  }

  // Business methods
  isImage(): boolean {
    return this.mimeType.startsWith("image/");
  }

  isDocument(): boolean {
    return (
      this.mimeType.startsWith("application/") &&
      ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"].some((ext) =>
        this.originalName.toLowerCase().endsWith(`.${ext}`)
      )
    );
  }

  isVideo(): boolean {
    return this.mimeType.startsWith("video/");
  }

  isAudio(): boolean {
    return this.mimeType.startsWith("audio/");
  }

  getExtension(): string {
    return this.extension;
  }

  getSizeInMB(): number {
    return this.size / (1024 * 1024);
  }

  isActive(): boolean {
    return this.status === FileStatus.ACTIVE && !this.deletedAt;
  }

  // Storage provider methods
  isCloudStorage(): boolean {
    return [
      StorageProvider.S3,
      StorageProvider.GCS,
      StorageProvider.AZURE,
      StorageProvider.MINIO,
      StorageProvider.CLOUDFLARE,
      StorageProvider.DIGITAL_OCEAN,
      StorageProvider.BACKBLAZE,
    ].includes(this.storageProvider);
  }

  isLocalStorage(): boolean {
    return this.storageProvider === StorageProvider.LOCAL;
  }

  // Entity methods
  hasEntity(): boolean {
    return this.entityType !== null && this.entityId !== null;
  }

  belongsToEntity(entityType: string, entityId: string): boolean {
    return this.entityType === entityType && this.entityId === entityId;
  }

  markAsDeleted(deletedBy?: string): File {
    const file = new File(
      this.id,
      this.originalName,
      this.fileName,
      this.mimeType,
      this.size,
      this.path,
      this.url,
      this.type,
      FileStatus.DELETED,
      this.entityType,
      this.entityId,
      this.extension,
      this.storageProvider,
      this.metadata,
      this.createdAt,
      this.createdBy
    );

    (file as any)._deletedAt = new Date();
    (file as any)._deletedBy = deletedBy || null;

    return file;
  }
}
