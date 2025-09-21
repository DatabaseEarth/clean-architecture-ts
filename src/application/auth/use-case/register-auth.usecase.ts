import { IUserRepository } from '@/domain/user/repositories/user.repository';
import { User } from '@/domain/user/entities/user';
import { RegisterUserDto } from '@/application/user/dtos/register-user.dto';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export class RegisterAuthUseCase {
    constructor(private readonly userRepo: IUserRepository) { }

    async execute(input: RegisterUserDto): Promise<User> {
        const existing = await this.userRepo.findByEmail(input.email);
        if (existing) throw new Error('Email already exists');

        const hashed = await bcrypt.hash(input.password, 10);

        const user = new User(
            crypto.randomUUID(),
            input.email,
            input.phone,
            hashed,
            input.fullName,
        );

        return this.userRepo.save(user);
    }
}
