import { BaseException } from "./base.exception";
import { ErrorCode } from "../enums/exception.enum";

/**
 * Database-specific exceptions
 *
 * Các lỗi liên quan đến database operations:
 * - Connection errors
 * - Transaction errors
 * - Query errors
 * - Migration errors
 */
export class DatabaseException extends BaseException {
  constructor(message: string, details?: Record<string, any>) {
    super({
      code: ErrorCode.DATABASE_ERROR,
      message,
      details,
    });
  }

  /**
   * Connection error
   */
  static connectionError(
    message: string,
    details?: Record<string, any>
  ): DatabaseException {
    return new DatabaseException(
      `Database connection error: ${message}`,
      details
    );
  }

  /**
   * Transaction error
   */
  static transactionError(
    message: string,
    details?: Record<string, any>
  ): DatabaseException {
    return new DatabaseException(`Transaction error: ${message}`, details);
  }

  /**
   * Query error
   */
  static queryError(
    message: string,
    details?: Record<string, any>
  ): DatabaseException {
    return new DatabaseException(`Query error: ${message}`, details);
  }

  /**
   * Migration error
   */
  static migrationError(
    message: string,
    details?: Record<string, any>
  ): DatabaseException {
    return new DatabaseException(`Migration error: ${message}`, details);
  }

  /**
   * No active transaction
   */
  static noActiveTransaction(): DatabaseException {
    return new DatabaseException("No active transaction to perform operation");
  }

  /**
   * Transaction already started
   */
  static transactionAlreadyStarted(): DatabaseException {
    return new DatabaseException("Transaction already started");
  }

  /**
   * Database constraint violation
   */
  static constraintViolation(
    constraint: string,
    details?: Record<string, any>
  ): DatabaseException {
    return new DatabaseException(
      `Database constraint violation: ${constraint}`,
      details
    );
  }

  /**
   * Record not found
   */
  static recordNotFound(table: string, id: string): DatabaseException {
    return new DatabaseException(
      `Record not found in table '${table}' with id '${id}'`
    );
  }

  /**
   * Duplicate key error
   */
  static duplicateKey(field: string, value: string): DatabaseException {
    return new DatabaseException(
      `Duplicate key error for field '${field}' with value '${value}'`
    );
  }
}
