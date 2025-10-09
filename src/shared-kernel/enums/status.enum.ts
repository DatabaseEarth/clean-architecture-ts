/**
 * Status Enums - Shared across all bounded contexts
 * These enums define common status values
 */

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
  DELETED = "deleted",
  SUSPENDED = "suspended",
  ARCHIVED = "archived",
}

export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  DEBUG = "debug",
  VERBOSE = "verbose",
}

export enum Environment {
  DEVELOPMENT = "development",
  STAGING = "staging",
  PRODUCTION = "production",
  TEST = "test",
}
