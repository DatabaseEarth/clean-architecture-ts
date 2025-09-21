import { User } from "@/domain/user/entities/user";
import { IUserRepository } from "@/domain/user/repositories/user.repository";
export declare class GetUserByIdUseCase {
    private readonly userRepo;
    constructor(userRepo: IUserRepository);
    execute(id: string): Promise<User | null>;
}
//# sourceMappingURL=get-user-by-id.usecase.d.ts.map