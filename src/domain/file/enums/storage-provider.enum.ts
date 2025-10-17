export enum StorageProvider {
  LOCAL = "local",
  S3 = "s3",
  GCS = "gcs",
  AZURE = "azure",
  MINIO = "minio",
  CLOUDFLARE = "cloudflare",
  DIGITAL_OCEAN = "digitalocean",
  BACKBLAZE = "backblaze",
}

export const STORAGE_PROVIDERS = Object.values(StorageProvider);

export const CLOUD_STORAGE_PROVIDERS = [
  StorageProvider.S3,
  StorageProvider.GCS,
  StorageProvider.AZURE,
  StorageProvider.MINIO,
  StorageProvider.CLOUDFLARE,
  StorageProvider.DIGITAL_OCEAN,
  StorageProvider.BACKBLAZE,
];

export const LOCAL_STORAGE_PROVIDERS = [StorageProvider.LOCAL];
