import { Injectable } from "@nestjs/common";
import { IUserRepository } from "@/domain/user/repositories";
import { User } from "@/domain/user/entities";
import { db, pool } from "../config";
import { users } from "../schema/users";
import { UserMapper } from "../mappers";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { PoolClient } from "pg";

@Injectable()
export class UserRepositoryDrizzle implements IUserRepository {
  private client?: PoolClient;

  setClient(client: PoolClient): void {
    this.client = client;
  }

  private getDb() {
    if (this.client) {
      return drizzle(this.client, { schema: { users } });
    }
    return db;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.getDb()
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (result.length === 0) return null;
    return UserMapper.toDomain(result[0]);
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.getDb()
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    if (result.length === 0) return null;
    return UserMapper.toDomain(result[0]);
  }

  async save(user: User): Promise<User> {
    const entity = UserMapper.toEntity(user);
    await this.getDb()
      .insert(users)
      .values(entity)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: entity.email,
          phone: entity.phone,
          password: entity.password,
          fullName: entity.fullName,
          updatedAt: new Date(),
        },
      });
    return user;
  }
}
