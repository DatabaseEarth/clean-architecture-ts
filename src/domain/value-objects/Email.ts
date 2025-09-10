export class Email {
  private constructor(private readonly value: string) {}

  public static create(email: string): Email {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw new Error("Invalid email format");
    }
    return new Email(email);
  }

  public getValue(): string {
    return this.value;
  }
}
