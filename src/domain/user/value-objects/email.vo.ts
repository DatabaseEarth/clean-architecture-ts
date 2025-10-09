import { ERROR_CODES, REGEX_PATTERNS } from "@/shared-kernel/constants";
import { BaseException } from "@/shared-kernel/exceptions";
import { ErrorCode } from "@/shared-kernel/enums/exception.enum";

export class Email {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new BaseException({
        code: ErrorCode.INVALID_FORMAT,
        message: `Email ${value} không hợp lệ.`,
        httpStatus: ERROR_CODES[ErrorCode.INVALID_FORMAT].httpStatus,
      });
    }
  }

  private isValid(email: string): boolean {
    const emailRegex = REGEX_PATTERNS.EMAIL;
    return emailRegex.test(email) && email.length <= 254;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
