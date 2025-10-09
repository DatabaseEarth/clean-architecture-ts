import { IUserRepository } from "@/domain/user/repositories";
import { User } from "@/domain/user/entities";
import { RegisterAuthRequestDto } from "@/application/auth/dtos";
import { IHashService, IUuidService } from "@/application/ports/security";
import { PhoneNumber, Email } from "@/domain/user/value-objects";
import { BaseException } from "@/shared-kernel/exceptions";
import { ErrorCode } from "@/shared-kernel/enums/exception.enum";
import { ERROR_CODES, VALIDATION_MESSAGES } from "@/shared-kernel/constants";

export class RegisterAuthUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly hashService: IHashService,
    private readonly uuidService: IUuidService
  ) {}

  async execute(input: RegisterAuthRequestDto): Promise<User> {
    try {
      const existing = await this.userRepo.findByEmail(input.email);
      if (existing)
        throw new BaseException({
          code: ErrorCode.BUSINESS_RULE_VIOLATION,
          message: VALIDATION_MESSAGES.EMAIL_ALERT_EXISTS,
          httpStatus: ERROR_CODES[ErrorCode.BUSINESS_RULE_VIOLATION].httpStatus,
        });

      const user = new User(
        this.uuidService.generate(),
        new Email(input.email),
        new PhoneNumber(input.phone),
        await this.hashService.hash(input.password),
        input.fullName
      );

      return await this.userRepo.save(user);
    } catch (error) {
      if (error instanceof BaseException) throw error;
      throw new BaseException({
        code: ErrorCode.INTERNAL_ERROR,
        message: VALIDATION_MESSAGES.REGISTER_FAILED,
        httpStatus: ERROR_CODES[ErrorCode.INTERNAL_ERROR].httpStatus,
      });
    }
  }
}
