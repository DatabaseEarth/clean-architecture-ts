"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterAuthUseCase = void 0;
const user_1 = require("../../../domain/user/entities/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
class RegisterAuthUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(input) {
        const existing = await this.userRepo.findByEmail(input.email);
        if (existing)
            throw new Error('Email already exists');
        const hashed = await bcrypt_1.default.hash(input.password, 10);
        const user = new user_1.User(crypto_1.default.randomUUID(), input.email, input.phone, hashed, input.fullName);
        return this.userRepo.save(user);
    }
}
exports.RegisterAuthUseCase = RegisterAuthUseCase;
//# sourceMappingURL=register-auth.usecase.js.map