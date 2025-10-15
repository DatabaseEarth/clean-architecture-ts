import { IFileRepository } from "@/domain/file/repositories";
import { File } from "@/domain/file/entities";
import { FileType, FileStatus } from "@/domain/file/enums";
import { FileUtil } from "../utils";
import { BaseException } from "@/shared-kernel/exceptions";
import { ErrorCode } from "@/shared-kernel/enums/exception.enum";
import { UpdateFileRequest, UpdateFileResponse } from "../dtos";
import { IConfigPort } from "@/application/ports";

export class UpdateFileUseCase {
  constructor(
    private readonly fileRepository: IFileRepository,
    private readonly configPort: IConfigPort
  ) {
    // Set config port for FileUtil
    FileUtil.setConfigPort(configPort);
  }

  async execute(request: UpdateFileRequest): Promise<UpdateFileResponse> {
    try {
      // Find existing file
      const existingFile = await this.fileRepository.findById(request.id);
      if (!existingFile)
        throw new BaseException({
          code: ErrorCode.NOT_FOUND,
          message: "File not found",
        });

      // Check if file is active
      if (!existingFile.isActive())
        throw new BaseException({
          code: ErrorCode.VALIDATION_ERROR,
          message: "Cannot update inactive or deleted file",
        });

      let updatedFile: File;

      // Handle new file upload if provided
      if (request.file) {
        // Validate new file size and type
        FileUtil.validateFileSize(request.file.size);
        if (request.type) {
          FileUtil.validateFileType(request.file.mimeType, request.type);
        }

        // Sanitize new filename
        const sanitizedOriginalName = FileUtil.sanitizeFileName(
          request.file.originalName
        );

        // Generate new file name and path
        const fileName = FileUtil.generateFileName(
          sanitizedOriginalName,
          existingFile.ownerType || "unknown",
          existingFile.ownerId || "unknown",
          request.type || existingFile.type
        );
        const path = FileUtil.generateFilePath(
          existingFile.ownerType || "unknown",
          existingFile.ownerId || "unknown",
          fileName
        );
        const url = FileUtil.generateFileUrl(path);

        // Check if new path already exists
        const fileWithSamePath = await this.fileRepository.findByPath(path);
        if (fileWithSamePath && fileWithSamePath.id !== request.id) {
          throw new BaseException({
            code: ErrorCode.VALIDATION_ERROR,
            message: "File with this path already exists",
          });
        }

        // Generate new metadata for updated file
        const generatedMetadata = FileUtil.generateFileMetadata(
          request.file,
          sanitizedOriginalName,
          fileName,
          request.type ?? existingFile.type
        );

        // Create updated file with new file data
        updatedFile = new File(
          existingFile.id,
          sanitizedOriginalName,
          fileName,
          request.file.mimeType,
          request.file.size,
          path,
          url,
          request.type ?? existingFile.type,
          request.status ?? existingFile.status,
          existingFile.ownerType,
          existingFile.ownerId,
          generatedMetadata,
          existingFile.createdAt,
          existingFile.createdBy
        );
      } else {
        // Update without new file - keep existing metadata but update type if changed
        let finalMetadata = existingFile.metadata;

        // If type changed, regenerate metadata to reflect new type
        if (request.type && request.type !== existingFile.type) {
          finalMetadata = FileUtil.generateFileMetadata(
            {
              originalName: existingFile.originalName,
              mimeType: existingFile.mimeType,
              buffer: Buffer.alloc(0), // Empty buffer since we don't have actual file content
              size: existingFile.size,
            },
            existingFile.originalName,
            existingFile.fileName,
            request.type
          );
        }

        // Update without new file - only metadata/status changes
        updatedFile = new File(
          existingFile.id,
          existingFile.originalName,
          existingFile.fileName,
          existingFile.mimeType,
          existingFile.size,
          existingFile.path,
          existingFile.url,
          request.type ?? existingFile.type,
          request.status ?? existingFile.status,
          existingFile.ownerType,
          existingFile.ownerId,
          finalMetadata,
          existingFile.createdAt,
          existingFile.createdBy
        );
      }

      // Mark as updated
      updatedFile.markAsUpdated(request.updatedBy);

      // Save to database
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
        message: "Failed to update file",
        details: { error: error.message },
      });
    }
  }
}
