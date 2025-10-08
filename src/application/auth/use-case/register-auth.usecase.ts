import { IUserRepository } from "@/domain/user/repositories";
import { User } from "@/domain/user/entities";
import { RegisterAuthRequestDto } from "@/application/auth/dtos";
import { IHashService, IUuidService } from "@/application/ports/security";
import { PhoneNumber, Email } from "@/domain/user/value-objects";
import { EmailAlreadyExistsException } from "@/shared-kernel/exceptions";

export class RegisterAuthUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly hashService: IHashService,
    private readonly uuidService: IUuidService
  ) {}

  async execute(input: RegisterAuthRequestDto): Promise<User> {
    try {
      const existing = await this.userRepo.findByEmail(input.email);
      if (existing) {
        throw new EmailAlreadyExistsException(input.email);
      }

      const user = new User(
        this.uuidService.generate(),
        new Email(input.email),
        new PhoneNumber(input.phone),
        await this.hashService.hash(input.password),
        input.fullName
      );

      return await this.userRepo.save(user);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsException) {
        throw error;
      }
      if (
        error.message.includes("Invalid email format") ||
        error.message.includes("Invalid phone number")
      ) {
        throw error;
      }
      throw new Error("Registration failed due to unexpected error");
    }
  }
}
