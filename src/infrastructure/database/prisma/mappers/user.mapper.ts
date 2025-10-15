import { User } from "@/domain/user/entities/user";
import { Email, PhoneNumber } from "@/domain/user/value-objects";
import { User as PrismaUser } from "@prisma/client";

export class UserMapper {
  static toDomain(entity: PrismaUser): User {
    return new User(
      entity.id,
      new Email(entity.email),
      new PhoneNumber(entity.phone),
      entity.password,
      entity.fullName,
      entity.createdAt,
      entity.createdBy
    );
  }

  static toEntity(user: User): Omit<PrismaUser, "refreshTokens"> {
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      password: user.password,
      fullName: user.fullName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy,
      deletedBy: user.deletedBy,
    };
  }
}
