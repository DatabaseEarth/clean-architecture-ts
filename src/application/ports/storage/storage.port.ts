export interface IStorageService {
  uploadFile(buffer: Buffer, key: string, mimeType: string): Promise<string>;

  deleteFile(key: string): Promise<void>;

  getFileUrl(key: string): string;
}
