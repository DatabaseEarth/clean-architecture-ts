import { FileType } from "@/domain/file/enums";
import { IFile } from "@/shared-kernel/interfaces";

export interface CreateFileRequest {
  file: IFile;
  type: FileType;
  createdBy?: string;
}

export interface CreateFileResponse {
  id: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;
  type: FileType;
  status: string;
  ownerType: string | null; // null khi chưa có owner
  ownerId: string | null; // null khi chưa có owner
  metadata?: Record<string, any>;
  createdAt: Date;
  createdBy?: string;
}
