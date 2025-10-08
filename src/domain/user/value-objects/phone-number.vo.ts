import { InvalidPhoneNumberException } from '@/shared-kernel/exceptions';

export class PhoneNumber {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new InvalidPhoneNumberException(value);
    }
  }

  private isValid(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
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