import { User } from "../entities/User.js";
import { Email } from "../../value-objects/Email.js";

export class UserAggregate {
  private constructor(private readonly user: User) {}

  static register(id: string, name: string, email: string): UserAggregate {
    const user = new User(id, name, Email.create(email));
    return new UserAggregate(user);
  }

  getUser(): User {
    return this.user;
  }
}
