import { Injectable } from "@nestjs/common";
import { UnitOfWorkPort } from "@/application/ports/transaction";
import { pool } from "../config";
import { PoolClient } from "pg";
import { DatabaseException } from "@/shared-kernel/exceptions";

@Injectable()
export class UnitOfWorkService implements UnitOfWorkPort {
  private client?: PoolClient;

  async start(): Promise<void> {
    if (this.client)
      // Already in a transaction, reuse it
      return;

    this.client = await pool.connect();
    await this.client.query("BEGIN");
  }

  async commit(): Promise<void> {
    if (!this.client) throw DatabaseException.noActiveTransaction();
    await this.client.query("COMMIT");
    this.client.release();
    this.client = undefined;
  }

  async rollback(): Promise<void> {
    if (!this.client) throw DatabaseException.noActiveTransaction();
    await this.client.query("ROLLBACK");
    this.client.release();
    this.client = undefined;
  }

  isActive(): boolean {
    return this.client !== undefined;
  }

  getClient(): PoolClient | undefined {
    return this.client;
  }
}
