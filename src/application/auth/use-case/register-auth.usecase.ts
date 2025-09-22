import { IUserRepository } from '@/domain/user/repositories/user.repository';
import { User } from '@/domain/user/entities/user';
import { RegisterAuthRequestDto } from '@/application/auth/dtos/register-auth.request.dto';
import { IHashService } from '@/application/security/services/hash.service';
import { IUuidService } from '@/application/security/services/uuid.service';

export class RegisterAuthUseCase {
    constructor(
        private readonly userRepo: IUserRepository,
        private readonly hashService: IHashService,
        private readonly uuidService: IUuidService,
    ) { }

    async execute(input: RegisterAuthRequestDto): Promise<User> {
        const existing = await this.userRepo.findByEmail(input.email);
        if (existing) throw new Error('Email already exists');

        const user = new User(
            this.uuidService.generate(),
            input.email,
            input.phone,
            await this.hashService.hash(input.password),
            input.fullName,
        );

        return this.userRepo.save(user);
    }
}
