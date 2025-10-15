import { IFileRepository } from "@/domain/file/repositories";
import { File } from "@/domain/file/entities";
import { FileType, FileStatus } from "@/domain/file/enums";
import { CreateFileRequest, CreateFileResponse } from "../dtos";
import { FileUtil } from "../utils";
import { IUuidService, IConfigPort } from "@/application/ports";
import { BaseException } from "@/shared-kernel/exceptions";
import { ErrorCode } from "@/shared-kernel/enums/exception.enum";

export class CreateFileUseCase {
  constructor(
    private readonly fileRepository: IFileRepository,
    private readonly uuidService: IUuidService,
    private readonly configPort: IConfigPort
  ) {
    // Set config port for FileUtil
    FileUtil.setConfigPort(configPort);
  }

  async execute(request: CreateFileRequest): Promise<CreateFileResponse> {
    try {
      // Validate file size and type
      FileUtil.validateFileSize(request.file.size);
      FileUtil.validateFileType(request.file.mimeType, request.type);

      // Sanitize original filename
      const sanitizedOriginalName = FileUtil.sanitizeFileName(
        request.file.originalName
      );

      // Generate file name, path and URL (temporary path)
      const timestamp = Date.now();
      const fileExtension = FileUtil.getFileExtension(sanitizedOriginalName);
      let fileName = `${request.type.toLowerCase()}-${timestamp}.${fileExtension}`;

      // Get temp path from config
      const tempPath =
        this.configPort.get<string>("TEMP_PATH", "/uploads/temp") ||
        "/uploads/temp";
      let path = `${tempPath}/${fileName}`;
      let url = FileUtil.generateFileUrl(path);

      // Check if file already exists (optimized with timestamp-based uniqueness)
      // Since we use timestamp in filename, collision is extremely unlikely
      // Only check if absolutely necessary for critical systems
      const existingFile = await this.fileRepository.findByPath(path);
      if (existingFile) {
        // Regenerate with new timestamp if collision occurs
        const newTimestamp = Date.now() + Math.random() * 1000;
        const newFileName = `${request.type.toLowerCase()}-${newTimestamp}.${fileExtension}`;
        const newPath = `${tempPath}/${newFileName}`;
        const newUrl = FileUtil.generateFileUrl(newPath);

        // Update variables with new values
        fileName = newFileName;
        path = newPath;
        url = newUrl;
      }

      // Generate comprehensive metadata automatically
      const generatedMetadata = FileUtil.generateFileMetadata(
        request.file,
        sanitizedOriginalName,
        fileName,
        request.type
      );

      // Create new file (chưa có owner)
      const fileId = this.uuidService.generate();
      const file = new File(
        fileId,
        sanitizedOriginalName,
        fileName,
        request.file.mimeType,
        request.file.size,
        path,
        url,
        request.type,
        FileStatus.ACTIVE,
        null, // Chưa có owner type
        null, // Chưa có owner ID
        generatedMetadata,
        new Date(),
        request.createdBy || null
      );

      // Save to database
      const savedFile = await this.fileRepository.save(file);

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
        ownerType: null, // Chưa có owner
        ownerId: null, // Chưa có owner
        metadata: savedFile.metadata,
        createdAt: savedFile.createdAt,
        createdBy: savedFile.createdBy,
      };
    } catch (error) {
      if (error instanceof BaseException) throw error;

      throw new BaseException({
        code: ErrorCode.INTERNAL_ERROR,
        message: "Failed to create file",
        details: { error: error.message },
      });
    }
  }
}
