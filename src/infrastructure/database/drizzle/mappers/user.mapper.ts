import { User } from "@/domain/user/entities";
import { Email, PhoneNumber } from "@/domain/user/value-objects";
import { users } from "../schema/users";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type UserSelect = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

export class UserMapper {
  static toDomain(entity: UserSelect): User {
    return new User(
      entity.id,
      new Email(entity.email),
      new PhoneNumber(entity.phone),
      entity.password,
      entity.fullName
    );
  }

  static toEntity(user: User): UserInsert {
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      password: user.password,
      fullName: user.fullName,
    };
  }
}
