"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = void 0;
const user_1 = require("../../../domain/user/entities/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
class RegisterUserUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(input) {
        const existing = await this.userRepo.findByEmail(input.email);
        if (existing)
            throw new Error('Email already exists');
        const hashedPassword = await bcrypt_1.default.hash(input.password, 10);
        const user = new user_1.User(crypto.randomUUID(), input.email, input.phone, hashedPassword, input.fullName);
        return this.userRepo.save(user);
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
//# sourceMappingURL=register-user.usecase.js.map