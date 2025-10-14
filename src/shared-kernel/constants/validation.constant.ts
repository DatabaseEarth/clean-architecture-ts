/**
 * Domain Constants - Shared across all bounded contexts
 * These constants define common domain rules and constraints
 */

export const VALIDATION_MESSAGES = {
  EMAIL_ALERT_EXISTS: "Email đã tồn tại",
  REGISTER_FAILED: "Đăng ký thất bại",
  INVALID_CREDENTIALS: "Email hoặc mật khẩu không đúng",
  LOGIN_FAILED: "Đăng nhập thất bại",

  // Authentication messages
  UNAUTHORIZED: "Không có quyền truy cập",
  TOKEN_EXPIRED: "Token đã hết hạn",
  INVALID_TOKEN: "Token không hợp lệ",
  ACCESS_TOKEN_REQUIRED: "Access token là bắt buộc",
} as const;
