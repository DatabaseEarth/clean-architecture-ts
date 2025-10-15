import { PrismaClient } from "@prisma/client";
import { TransactionPort } from "@/application/ports/transaction";

export class TransactionService implements TransactionPort {
  constructor(private readonly prismaClient: PrismaClient) {}

  async runInTransaction<T>(
    operation: (prisma: PrismaClient) => Promise<T>
  ): Promise<T> {
    return await this.prismaClient.$transaction(operation);
  }
}
