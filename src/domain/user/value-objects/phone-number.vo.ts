import { ERROR_CODES, REGEX_PATTERNS } from "@/shared-kernel/constants";
import { BaseException } from "@/shared-kernel/exceptions";
import { ErrorCode } from "@/shared-kernel/enums/exception.enum";

export class PhoneNumber {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new BaseException({
        code: ErrorCode.INVALID_FORMAT,
        message: `Số điện thoại ${value} không hợp lệ.`,
        httpStatus: ERROR_CODES[ErrorCode.INVALID_FORMAT].httpStatus,
      });
    }
  }

  private isValid(phone: string): boolean {
    const phoneRegex = REGEX_PATTERNS.PHONE;
    return phoneRegex.test(phone) && phone.length >= 10 && phone.length <= 15;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
