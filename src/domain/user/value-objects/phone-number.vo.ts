export class PhoneNumber {
  constructor(private readonly value: string) {
    if (!/^\+?[1-9]\d{1,14}$/.test(value)) {
      throw new Error("Invalid phone number");
    }
  }

  getValue(): string {
    return this.value;
  }
}