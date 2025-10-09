import { REGEX_PATTERNS } from "@/shared-kernel/constants";
import { InvalidPhoneNumberException } from "@/shared-kernel/core";

export class PhoneNumber {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new InvalidPhoneNumberException(value);
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
