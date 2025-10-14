import { Injectable } from "@nestjs/common";
import { UnitOfWorkPort } from "@/application/ports/transaction";
import { pool } from "../config";
import { PoolClient } from "pg";

@Injectable()
export class UnitOfWorkService implements UnitOfWorkPort {
  private client?: PoolClient;

  async start(): Promise<void> {
    if (this.client) {
      // Already in a transaction, reuse it
      return;
    }
    this.client = await pool.connect();
    await this.client.query("BEGIN");
  }

  async commit(): Promise<void> {
    if (!this.client) throw new Error("No active transaction");
    await this.client.query("COMMIT");
    this.client.release();
    this.client = undefined;
  }

  async rollback(): Promise<void> {
    if (!this.client) throw new Error("No active transaction");
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
