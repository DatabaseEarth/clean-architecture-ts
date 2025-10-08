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

  // UUID validation
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

  // Date validation
  DATE_ISO: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
  DATE_SIMPLE: /^\d{4}-\d{2}-\d{2}$/,

  // File validation
  IMAGE_EXTENSION: /\.(jpg|jpeg|png|gif|webp)$/i,
  DOCUMENT_EXTENSION: /\.(pdf|doc|docx|txt)$/i,

  // Currency validation
  CURRENCY: /^\d+(\.\d{1,2})?$/,

  // Color validation
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  // Slug validation
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

export const VALIDATION_RULES = {
  // Email rules
  EMAIL: {
    pattern: REGEX_PATTERNS.EMAIL,
    message: "Invalid email format",
    required: true,
  },

  // Phone rules
  PHONE: {
    pattern: REGEX_PATTERNS.PHONE,
    message: "Invalid phone format",
    required: false,
  },

  PHONE_INTERNATIONAL: {
    pattern: REGEX_PATTERNS.PHONE_INTERNATIONAL,
    message: "Invalid international phone format",
    required: false,
  },

  // Password rules
  PASSWORD: {
    pattern: REGEX_PATTERNS.PASSWORD,
    message:
      "Password must contain at least 8 characters, including uppercase, lowercase, number and special character",
    required: true,
  },

  PASSWORD_SIMPLE: {
    pattern: REGEX_PATTERNS.PASSWORD_SIMPLE,
    message: "Password must be at least 8 characters long",
    required: true,
  },

  // Name rules
  NAME: {
    pattern: REGEX_PATTERNS.NAME,
    message: "Name must contain only letters and spaces, 2-100 characters",
    required: true,
  },

  USERNAME: {
    pattern: REGEX_PATTERNS.USERNAME,
    message:
      "Username must contain only letters, numbers and underscores, 3-30 characters",
    required: true,
  },

  // URL rules
  URL: {
    pattern: REGEX_PATTERNS.URL,
    message: "Invalid URL format",
    required: false,
  },

  // UUID rules
  UUID: {
    pattern: REGEX_PATTERNS.UUID,
    message: "Invalid UUID format",
    required: true,
  },
} as const;
