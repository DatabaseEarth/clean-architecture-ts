import { User } from "@/domain/user/entities";
import { IUserRepository } from "@/domain/user/repositories";

export class GetUserByEmailUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }
}
