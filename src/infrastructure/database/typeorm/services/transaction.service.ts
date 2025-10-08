import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { TransactionPort } from "@/application/ports/transaction";
import { AppDataSource } from "../data-source";

@Injectable()
export class TransactionService implements TransactionPort {
  constructor(private readonly dataSource: DataSource = AppDataSource) {}

  async runInTransaction<T>(
    operation: (manager: EntityManager) => Promise<T>
  ): Promise<T> {
    return await this.dataSource.manager.transaction(operation);
  }
}
