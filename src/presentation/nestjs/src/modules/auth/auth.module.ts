import { RegisterAuthUseCase } from "@/application/auth/use-case/register-auth.usecase";
import { UserRepositoryTypeORM } from "@/infrastructure/databse/typeorm/repositories/user.repository.typeorm";
import { Module } from "@nestjs/common";
import { AuthController } from "./controllers";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        {
            provide: RegisterAuthUseCase,
            useFactory: (userRepo: UserRepositoryTypeORM) =>
                new RegisterAuthUseCase(userRepo),
            inject: [UserRepositoryTypeORM],
        },
        UserRepositoryTypeORM
    ],
    exports: []
})
export class AuthModule { }