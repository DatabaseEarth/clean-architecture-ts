export interface FileMetadata {
  // File information
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  extension: string;

  // File type detection
  isImage: boolean;
  isDocument: boolean;
  isVideo: boolean;
  isAudio: boolean;
  isArchive: boolean;

  // Technical metadata
  sizeInMB: number;
  sizeInKB: number;
  uploadTimestamp: number;

  // File validation
  isValid: boolean;
  validationErrors?: string[];

  // Additional metadata based on file type
  imageMetadata?: {
    width?: number;
    height?: number;
    colorSpace?: string;
    hasAlpha?: boolean;
  };

  documentMetadata?: {
    pageCount?: number;
    author?: string;
    title?: string;
    subject?: string;
    creator?: string;
  };

  videoMetadata?: {
    duration?: number;
    width?: number;
    height?: number;
    frameRate?: number;
    codec?: string;
  };

  audioMetadata?: {
    duration?: number;
    bitrate?: number;
    sampleRate?: number;
    channels?: number;
    codec?: string;
  };
}
