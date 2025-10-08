/**
 * Unit of Work Port
 * 
 * Simple transaction management:
 * - Start transaction
 * - Commit transaction  
 * - Rollback transaction
 * 
 * Following Clean Architecture principles:
 * - Interface in application layer
 * - Implementation in infrastructure layer
 * - Simple and focused
 */
export interface UnitOfWorkPort {
    /**
     * Start a new transaction
     */
    start(): Promise<void>;

    /**
     * Commit the current transaction
     */
    commit(): Promise<void>;

    /**
     * Rollback the current transaction
     */
    rollback(): Promise<void>;

    /**
     * Check if a transaction is active
     * @returns true if transaction is active
     */
    isActive(): boolean;
}
