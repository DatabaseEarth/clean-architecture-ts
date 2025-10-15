import { FileType } from "@/domain/file/enums";
import { BaseException } from "@/shared-kernel/exceptions";
import { ErrorCode } from "@/shared-kernel/enums/exception.enum";
import { IConfigPort } from "@/application/ports";
import { FileMetadata } from "@/shared-kernel/interfaces";
import { IFile } from "@/shared-kernel/interfaces";

export class FileUtil {
  private static configPort: IConfigPort;
  private static configCache: Map<string, any> = new Map();

  static setConfigPort(configPort: IConfigPort): void {
    this.configPort = configPort;
  }

  /**
   * Get cached config value to improve performance
   */
  private static getCachedConfig<T>(key: string, defaultValue: T): T {
    if (this.configCache.has(key)) {
      return this.configCache.get(key);
    }

    const value = this.configPort?.get<T>(key, defaultValue) || defaultValue;
    this.configCache.set(key, value);
    return value;
  }

  /**
   * Clear config cache (useful for testing or config changes)
   */
  static clearConfigCache(): void {
    this.configCache.clear();
  }

  static validateFileSize(size: number, maxSize?: number): void {
    const limit =
      maxSize ||
      this.getCachedConfig<number>("MAX_FILE_SIZE", 10 * 1024 * 1024);

    if (size > limit) {
      const limitMB = Math.round(limit / 1024 / 1024);
      throw new BaseException({
        code: ErrorCode.VALIDATION_ERROR,
        message: `File size exceeds maximum limit of ${limitMB}MB`,
      });
    }
  }

  static validateFileType(mimeType: string, type: FileType): void {
    const validMimeTypes = {
      [FileType.AVATAR]: ["image/jpeg", "image/png", "image/gif", "image/webp"],
      [FileType.IMAGE]: [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
      ],
      [FileType.DOCUMENT]: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      [FileType.VIDEO]: ["video/mp4", "video/avi", "video/mov", "video/wmv"],
      [FileType.AUDIO]: ["audio/mp3", "audio/wav", "audio/ogg", "audio/mpeg"],
      [FileType.ARCHIVE]: [
        "application/zip",
        "application/x-rar-compressed",
        "application/x-7z-compressed",
      ],
    };

    const allowedMimeTypes = validMimeTypes[type] || [];
    if (allowedMimeTypes.length > 0 && !allowedMimeTypes.includes(mimeType)) {
      throw new BaseException({
        code: ErrorCode.VALIDATION_ERROR,
        message: `Invalid mime type ${mimeType} for file type ${type}`,
      });
    }
  }

  static getFileExtension(filename: string): string {
    return filename.split(".").pop()?.toLowerCase() || "";
  }

  static sanitizeFileName(filename: string): string {
    // Remove extension first
    const extension = this.getFileExtension(filename);
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

    // Replace spaces and special characters with underscores
    let sanitized = nameWithoutExt
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .replace(/[<>:"/\\|?*]/g, "_") // Replace special characters
      .replace(/[^\w\-_]/g, "_") // Replace non-alphanumeric except - and _
      .replace(/_+/g, "_") // Replace multiple underscores with single
      .replace(/^_|_$/g, ""); // Remove leading/trailing underscores

    // Ensure name is not empty
    if (!sanitized) {
      sanitized = "file";
    }

    // Limit length
    if (sanitized.length > 100) {
      sanitized = sanitized.substring(0, 100);
    }

    return extension ? `${sanitized}.${extension}` : sanitized;
  }

  static generateFileName(
    originalName: string,
    ownerType: string,
    ownerId: string,
    type: FileType
  ): string {
    const fileExtension = this.getFileExtension(originalName);
    const timestamp = Date.now();
    return `${ownerType}_${ownerId}_${type.toLowerCase()}_${timestamp}.${fileExtension}`;
  }

  static generateFilePath(
    ownerType: string,
    ownerId: string,
    fileName: string
  ): string {
    const uploadPath = this.getCachedConfig<string>("UPLOAD_PATH", "/uploads");
    return `${uploadPath}/${ownerType}/${ownerId}/${fileName}`;
  }

  static generateFileUrl(path: string): string {
    const cdnUrl = this.getCachedConfig<string>(
      "CDN_URL",
      "https://cdn.example.com"
    );
    return `${cdnUrl}${path}`;
  }

  /**
   * Generate comprehensive metadata for a file based on its properties
   */
  static generateFileMetadata(
    file: IFile,
    originalName: string,
    fileName: string,
    type: FileType
  ): FileMetadata {
    const extension = this.getFileExtension(originalName);
    const sizeInMB = file.size / (1024 * 1024);
    const sizeInKB = file.size / 1024;
    const uploadTimestamp = Date.now();

    // Basic file information
    const metadata: FileMetadata = {
      originalName,
      fileName,
      mimeType: file.mimeType,
      size: file.size,
      extension,
      isImage: file.mimeType.startsWith("image/"),
      isDocument: this.isDocumentMimeType(file.mimeType),
      isVideo: file.mimeType.startsWith("video/"),
      isAudio: file.mimeType.startsWith("audio/"),
      isArchive: this.isArchiveMimeType(file.mimeType),
      sizeInMB: Math.round(sizeInMB * 100) / 100, // Round to 2 decimal places
      sizeInKB: Math.round(sizeInKB * 100) / 100,
      uploadTimestamp,
      isValid: true,
      validationErrors: [],
    };

    // Add type-specific metadata
    if (metadata.isImage) {
      metadata.imageMetadata = {
        hasAlpha:
          file.mimeType === "image/png" || file.mimeType === "image/gif",
        colorSpace: "RGB", // Default, could be enhanced with actual image analysis
      };
    }

    if (metadata.isDocument) {
      metadata.documentMetadata = {
        // Could be enhanced with actual document parsing
        pageCount: 1, // Default, could be extracted from PDF/DOC
      };
    }

    if (metadata.isVideo) {
      metadata.videoMetadata = {
        // Could be enhanced with actual video analysis
        codec: "unknown", // Could be extracted from video headers
      };
    }

    if (metadata.isAudio) {
      metadata.audioMetadata = {
        // Could be enhanced with actual audio analysis
        codec: "unknown", // Could be extracted from audio headers
      };
    }

    return metadata;
  }

  /**
   * Check if mime type is a document type
   */
  private static isDocumentMimeType(mimeType: string): boolean {
    const documentMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
      "text/csv",
    ];
    return documentMimeTypes.includes(mimeType);
  }

  /**
   * Check if mime type is an archive type
   */
  private static isArchiveMimeType(mimeType: string): boolean {
    const archiveMimeTypes = [
      "application/zip",
      "application/x-rar-compressed",
      "application/x-7z-compressed",
      "application/x-tar",
      "application/gzip",
    ];
    return archiveMimeTypes.includes(mimeType);
  }
}
