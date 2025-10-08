import { User } from "@/domain/user/entities/user";
import { Email, PhoneNumber } from "@/domain/user/value-objects";
import { UserEntity } from "../entities/user.entity";

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      new Email(entity.email),
      new PhoneNumber(entity.phone),
      entity.password,
      entity.fullName
    );
  }

  static toEntity(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.phone = user.phone;
    entity.password = user.password;
    entity.fullName = user.fullName;
    return entity;
  }
}
