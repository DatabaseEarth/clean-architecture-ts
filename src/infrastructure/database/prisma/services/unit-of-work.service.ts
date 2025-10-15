import { PrismaClient } from "@prisma/client";
import { UnitOfWorkPort } from "@/application/ports/transaction";
import { DatabaseException } from "@/shared-kernel/exceptions";

/**
 * Unit of Work Service Implementation for Prisma
 *
 * Transaction management using Prisma:
 * - Start/Commit/Rollback transactions
 * - PrismaClient management
 * - Clean and simple
 *
 * Following Clean Architecture principles:
 * - Implementation in infrastructure layer
 * - Simple and focused
 * - Easy to use
 */
export class UnitOfWorkService implements UnitOfWorkPort {
  private transactionClient: PrismaClient | null = null;
  private isTransactionActive: boolean = false;

  constructor(private readonly prismaClient: PrismaClient) {}

  async start(): Promise<void> {
    if (this.isTransactionActive && this.transactionClient) {
      // Already in a transaction, reuse it
      return;
    }

    this.transactionClient = new PrismaClient();
    await this.transactionClient.$connect();
    this.isTransactionActive = true;
  }

  async commit(): Promise<void> {
    if (!this.isTransactionActive || !this.transactionClient) {
      throw DatabaseException.noActiveTransaction();
    }

    await this.transactionClient.$disconnect();
    this.transactionClient = null;
    this.isTransactionActive = false;
  }

  async rollback(): Promise<void> {
    if (!this.isTransactionActive || !this.transactionClient) {
      throw DatabaseException.noActiveTransaction();
    }

    await this.transactionClient.$disconnect();
    this.transactionClient = null;
    this.isTransactionActive = false;
  }

  isActive(): boolean {
    return this.isTransactionActive && this.transactionClient !== null;
  }

  /**
   * Get the current PrismaClient for repositories to use
   * @returns Current PrismaClient
   * @throws Error if no transaction is active
   */
  getPrismaClient(): PrismaClient {
    if (!this.isTransactionActive || !this.transactionClient) {
      throw DatabaseException.noActiveTransaction();
    }

    return this.transactionClient;
  }

  /**
   * Execute a function within a transaction
   * @param fn Function to execute within transaction
   * @returns Result of the function
   */
  async executeInTransaction<T>(
    fn: (prisma: PrismaClient) => Promise<T>
  ): Promise<T> {
    if (!this.isTransactionActive || !this.transactionClient) {
      throw DatabaseException.noActiveTransaction();
    }

    return this.transactionClient.$transaction(fn);
  }
}
