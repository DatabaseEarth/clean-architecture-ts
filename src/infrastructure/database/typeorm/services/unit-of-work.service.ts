import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { UnitOfWorkPort } from '@/shared-kernel/application/ports/transaction/unit-of-work.port';
import { AppDataSource } from '../data-source';

/**
 * Unit of Work Service Implementation
 * 
 * Simple transaction management using TypeORM:
 * - Start/Commit/Rollback transactions
 * - QueryRunner management
 * - Clean and simple
 * 
 * Following Clean Architecture principles:
 * - Implementation in infrastructure layer
 * - Simple and focused
 * - Easy to use
 */
@Injectable()
export class UnitOfWorkService implements UnitOfWorkPort {
    private queryRunner: QueryRunner | null = null;

    constructor(private readonly dataSource: DataSource = AppDataSource) {}

    async start(): Promise<void> {
        if (this.queryRunner && this.queryRunner.isTransactionActive) {
            // Already in a transaction, reuse it
            return;
        }
        
        this.queryRunner = this.dataSource.createQueryRunner();
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
    }

    async commit(): Promise<void> {
        if (!this.queryRunner) {
            throw new Error('No transaction started. Call start() first.');
        }
        
        await this.queryRunner.commitTransaction();
        await this.queryRunner.release();
        this.queryRunner = null;
    }

    async rollback(): Promise<void> {
        if (!this.queryRunner) {
            throw new Error('No transaction started. Call start() first.');
        }
        
        await this.queryRunner.rollbackTransaction();
        await this.queryRunner.release();
        this.queryRunner = null;
    }

    isActive(): boolean {
        return this.queryRunner !== null && this.queryRunner.isTransactionActive;
    }

    /**
     * Get the current QueryRunner for repositories to use
     * @returns Current QueryRunner
     * @throws Error if no transaction is active
     */
    getQueryRunner(): QueryRunner {
        if (!this.queryRunner) {
            throw new Error('No transaction active. Call start() first.');
        }
        return this.queryRunner;
    }
}
