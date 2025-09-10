import { User } from "../entities/User.js";

export class UserRegisteredEvent {
  constructor(
    public readonly user: User,
    public readonly occurredOn: Date = new Date()
  ) {}
}
