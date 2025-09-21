"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdUseCase = void 0;
class GetUserByIdUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(id) {
        return this.userRepo.findById(id);
    }
}
exports.GetUserByIdUseCase = GetUserByIdUseCase;
//# sourceMappingURL=get-user-by-id.usecase.js.map