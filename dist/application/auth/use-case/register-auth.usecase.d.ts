import { IUserRepository } from '@/domain/user/repositories/user.repository';
import { User } from '@/domain/user/entities/user';
import { RegisterUserDto } from '@/application/user/dtos/register-user.dto';
export declare class RegisterAuthUseCase {
    private readonly userRepo;
    constructor(userRepo: IUserRepository);
    execute(input: RegisterUserDto): Promise<User>;
}
//# sourceMappingURL=register-auth.usecase.d.ts.map