import { FileType, FileStatus } from "@/domain/file/enums";
import { IFile } from "@/shared-kernel/interfaces";

export interface UpdateFileRequest {
  id: string;
  file?: IFile; // Thêm lại file upload
  type?: FileType;
  status?: FileStatus;
  updatedBy?: string;
}

export interface UpdateFileResponse {
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
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
