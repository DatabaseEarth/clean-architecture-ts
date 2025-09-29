import { IUserRepository } from '@/domain/user/repositories/user.repository';
import { User } from '@/domain/user/entities/user';
import { RegisterAuthRequestDto } from '@/application/auth/dtos/register-auth.request.dto';
import { IHashService } from '@/shared-kernel/application/ports/security/hash.port';
import { IUuidService } from '@/shared-kernel/application/ports/security/uuid.port';
import { Email } from '@/shared-kernel/domain/value-objects/email.vo';
import { PhoneNumber } from '@/domain/user/value-objects/phone-number.vo';
import { EmailAlreadyExistsException } from '@/shared-kernel/domain/exceptions';

export class RegisterAuthUseCase {
    constructor(
        private readonly userRepo: IUserRepository,
        private readonly hashService: IHashService,
        private readonly uuidService: IUuidService,
    ) { }

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
                input.fullName,
            );

            return await this.userRepo.save(user);
        } catch (error) {
            if (error instanceof EmailAlreadyExistsException) {
                throw error;
            }
            if (error.message.includes('Invalid email format') || 
                error.message.includes('Invalid phone number')) {
                throw error;
            }
            throw new Error('Registration failed due to unexpected error');
        }
    }
}
