import { BaseEntity } from "@/shared-kernel/core";
import { FileType, FileStatus } from "../enums";

export class File extends BaseEntity {
  private _originalName: string;
  private _fileName: string;
  private _mimeType: string;
  private _size: number;
  private _path: string;
  private _url: string;
  private _type: FileType;
  private _status: FileStatus;
  private _ownerType: string | null; // 'user', 'account', 'customer', etc.
  private _ownerId: string | null;
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
    ownerType: string | null,
    ownerId: string | null,
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
    this._ownerType = ownerType;
    this._ownerId = ownerId;
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

  get ownerType(): string | null {
    return this._ownerType;
  }

  get ownerId(): string | null {
    return this._ownerId;
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
    return this.originalName.split(".").pop()?.toLowerCase() || "";
  }

  getSizeInMB(): number {
    return this.size / (1024 * 1024);
  }

  isActive(): boolean {
    return this.status === FileStatus.ACTIVE && !this.deletedAt;
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
      this.ownerType,
      this.ownerId,
      this.metadata,
      this.createdAt,
      this.createdBy
    );
    file.markAsDeleted(deletedBy);
    return file;
  }
}
