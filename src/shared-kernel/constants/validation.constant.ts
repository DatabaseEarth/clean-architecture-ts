/**
 * Domain Constants - Shared across all bounded contexts
 * These constants define common domain rules and constraints
 */

export const VALIDATION_MESSAGES = {
  // Common validation messages
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Invalid email format",
  INVALID_PHONE: "Invalid phone format",
  INVALID_PASSWORD: "Password must be at least 8 characters long",
  INVALID_NAME: "Name must be between 2 and 100 characters",

  // Length validation messages
  TOO_SHORT: "Value is too short",
  TOO_LONG: "Value is too long",

  // Business rule messages
  USER_NOT_FOUND: "User not found",
  INVALID_CREDENTIALS: "Invalid credentials",
  ACCESS_DENIED: "Access denied",
  RESOURCE_NOT_FOUND: "Resource not found",

  // System messages
  INTERNAL_ERROR: "Internal server error",
  VALIDATION_ERROR: "Validation error",
  BUSINESS_RULE_VIOLATION: "Business rule violation",
} as const;
