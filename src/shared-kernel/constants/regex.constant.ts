/**
 * Regex Constants - Shared across all bounded contexts
 * These regex patterns define common validation rules
 */

export const REGEX_PATTERNS = {
  // Email validation
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone validation
  PHONE: /^\+?[1-9]\d{1,14}$/,
  PHONE_INTERNATIONAL: /^\+[1-9][\d\s\-\(\)\.]{6,18}$/,

  // Password validation
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PASSWORD_SIMPLE: /^.{8,}$/,

  // Name validation
  NAME: /^[a-zA-Z\s\u00C0-\u017F]{2,100}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,

  // URL validation
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,

  // UUID validation - V4 format
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

  // Date validation
  DATE_ISO: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
  DATE_SIMPLE: /^\d{4}-\d{2}-\d{2}$/,

  // File validation
  IMAGE_EXTENSION: /\.(jpg|jpeg|png|gif|webp)$/i,
  DOCUMENT_EXTENSION: /\.(pdf|doc|docx|txt)$/i,
  EXCEL_EXTENSION: /\.(xls|xlsx|xlsm|xlsb)$/i,

  // Currency validation
  CURRENCY: /^\d+(\.\d{1,2})?$/,

  // Color validation
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  // Slug validation
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;
