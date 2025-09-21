import { User } from "@/domain/user/entities/user";
import { IUserRepository } from "@/domain/user/repositories/user.repository";
export declare class GetUserByEmailUseCase {
    private readonly userRepo;
    constructor(userRepo: IUserRepository);
    execute(email: string): Promise<User | null>;
}
//# sourceMappingURL=get-user-by-email.usecase.d.ts.map