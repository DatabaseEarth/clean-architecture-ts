export class Email {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error("Invalid email format");
    }
  }

  private isValid(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  getValue(): string {
    return this.value;
  }
}