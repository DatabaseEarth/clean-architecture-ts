export interface TransactionPort {
  runInTransaction<T>(operation: () => Promise<T>): Promise<T>;
}
