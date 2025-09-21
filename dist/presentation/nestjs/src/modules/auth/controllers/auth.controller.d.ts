import { RegisterAuthUseCase } from "@/application/auth/use-case/register-auth.usecase";
import { RegisterRequestDto } from "../dto";
export declare class AuthController {
    private readonly registerAuthUseCase;
    constructor(registerAuthUseCase: RegisterAuthUseCase);
    register(input: RegisterRequestDto): Promise<import("../../../common/interfaces").ApiResponse<unknown>>;
}
//# sourceMappingURL=auth.controller.d.ts.map