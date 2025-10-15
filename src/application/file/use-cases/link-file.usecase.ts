import { IFileRepository } from "@/domain/file/repositories";
import { File } from "@/domain/file/entities";
import { FileType, FileStatus } from "@/domain/file/enums";
import { FileUtil } from "../utils";
import { BaseException } from "@/shared-kernel/exceptions";
import { ErrorCode } from "@/shared-kernel/enums/exception.enum";
import { IConfigPort } from "@/application/ports";

export interface LinkFileRequest {
  fileId: string;
  ownerType: string;
  ownerId: string;
  updatedBy?: string;
}

export interface LinkFileResponse {
  id: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;
  type: FileType;
  status: FileStatus;
  ownerType: string;
  ownerId: string;
  metadata?: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export class LinkFileUseCase {
  constructor(
    private readonly fileRepository: IFileRepository,
    private readonly configPort: IConfigPort
  ) {
    // Set config port for FileUtil
    FileUtil.setConfigPort(configPort);
  }

  async execute(request: LinkFileRequest): Promise<LinkFileResponse> {
    try {
      // 1. Find existing file
      const existingFile = await this.fileRepository.findById(request.fileId);
      if (!existingFile) {
        throw new BaseException({
          code: ErrorCode.NOT_FOUND,
          message: "File not found",
        });
      }

      // 2. Check if file is active
      if (!existingFile.isActive()) {
        throw new BaseException({
          code: ErrorCode.VALIDATION_ERROR,
          message: "Cannot link inactive or deleted file",
        });
      }

      // 3. Check if file already has owner
      if (existingFile.ownerType !== null || existingFile.ownerId !== null) {
        throw new BaseException({
          code: ErrorCode.VALIDATION_ERROR,
          message: "File already has an owner",
        });
      }

      // 4. Generate new file name and path with real owner
      const fileName = FileUtil.generateFileName(
        existingFile.originalName,
        request.ownerType,
        request.ownerId,
        existingFile.type
      );
      const path = FileUtil.generateFilePath(
        request.ownerType,
        request.ownerId,
        fileName
      );
      const url = FileUtil.generateFileUrl(path);

      // 5. Check if new path already exists
      const fileWithSamePath = await this.fileRepository.findByPath(path);
      if (fileWithSamePath && fileWithSamePath.id !== request.fileId) {
        throw new BaseException({
          code: ErrorCode.VALIDATION_ERROR,
          message: "File with this path already exists",
        });
      }

      // 6. Create updated file with real owner
      const updatedFile = new File(
        existingFile.id,
        existingFile.originalName,
        fileName,
        existingFile.mimeType,
        existingFile.size,
        path,
        url,
        existingFile.type,
        existingFile.status,
        request.ownerType,
        request.ownerId,
        existingFile.metadata,
        existingFile.createdAt,
        existingFile.createdBy
      );

      // 7. Mark as updated
      updatedFile.markAsUpdated(request.updatedBy);

      // 8. Save to database
      const savedFile = await this.fileRepository.update(updatedFile);

      return {
        id: savedFile.id,
        originalName: savedFile.originalName,
        fileName: savedFile.fileName,
        mimeType: savedFile.mimeType,
        size: savedFile.size,
        path: savedFile.path,
        url: savedFile.url,
        type: savedFile.type,
        status: savedFile.status,
        ownerType: savedFile.ownerType,
        ownerId: savedFile.ownerId,
        metadata: savedFile.metadata,
        createdAt: savedFile.createdAt,
        updatedAt: savedFile.updatedAt,
        createdBy: savedFile.createdBy,
        updatedBy: savedFile.updatedBy,
      };
    } catch (error) {
      if (error instanceof BaseException) {
        throw error;
      }
      throw new BaseException({
        code: ErrorCode.INTERNAL_ERROR,
        message: "Failed to link file",
        details: { error: error.message },
      });
    }
  }
}
