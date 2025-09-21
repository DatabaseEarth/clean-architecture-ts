
import { IUserRepository } from '@/domain/user/repositories/user.repository';
import type { RegisterUserDto } from '../dtos/register-user.dto';
import { User } from '@/domain/user/entities/user';
import bcrypt from 'bcrypt';

export class RegisterUserUseCase {
    constructor(private readonly userRepo: IUserRepository) { }

    async execute(input: RegisterUserDto): Promise<User> {
        const existing = await this.userRepo.findByEmail(input.email);
        if (existing) throw new Error('Email already exists');

        const hashedPassword = await bcrypt.hash(input.password, 10);

        const user = new User(
            crypto.randomUUID(),
            input.email,
            input.phone,
            hashedPassword,
            input.fullName,
        );

        return this.userRepo.save(user);
    }
}
