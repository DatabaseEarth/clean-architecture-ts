import { User } from "@/domain/user/entities";
import { IUserRepository } from "@/domain/user/repositories";

export class GetUserByIdUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  }
}
