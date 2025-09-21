"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByEmailUseCase = void 0;
class GetUserByEmailUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(email) {
        return this.userRepo.findByEmail(email);
    }
}
exports.GetUserByEmailUseCase = GetUserByEmailUseCase;
//# sourceMappingURL=get-user-by-email.usecase.js.map