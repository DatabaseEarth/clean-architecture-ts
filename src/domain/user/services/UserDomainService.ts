import { User } from "../entities/User.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class UserDomainService {
  constructor(private readonly userRepository: UserRepository) {}

  async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return !!user;
  }

  async registerUser(user: User): Promise<void> {
    if (await this.isEmailTaken(user.email.getValue())) {
      throw new Error("Email already in use");
    }
    await this.userRepository.save(user);
  }
}
