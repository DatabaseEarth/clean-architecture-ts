import { Email } from "../../value-objects/Email.js";

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: Email
  ) {}

  changeName(newName: string) {
    this.name = newName;
  }
}
