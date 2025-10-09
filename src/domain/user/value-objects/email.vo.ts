import { REGEX_PATTERNS } from "@/shared-kernel/constants";
import { InvalidEmailFormatException } from "@/shared-kernel/core";

export class Email {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new InvalidEmailFormatException(value);
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
