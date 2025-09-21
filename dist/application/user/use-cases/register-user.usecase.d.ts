import { IUserRepository } from '@/domain/user/repositories/user.repository';
import type { RegisterUserDto } from '../dtos/register-user.dto';
import { User } from '@/domain/user/entities/user';
export declare class RegisterUserUseCase {
    private readonly userRepo;
    constructor(userRepo: IUserRepository);
    execute(input: RegisterUserDto): Promise<User>;
}
//# sourceMappingURL=register-user.usecase.d.ts.map