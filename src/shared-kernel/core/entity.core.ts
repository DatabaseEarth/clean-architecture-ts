export abstract class BaseEntity {
  protected readonly _id: string;
  protected readonly _createdAt: Date;
  protected _updatedAt: Date;
  protected _deletedAt: Date | null;
  protected readonly _createdBy: string | null;
  protected _updatedBy: string | null;
  protected _deletedBy: string | null;

  constructor(id: string, createdAt?: Date, createdBy?: string | null) {
    this._id = id;
    this._createdAt = createdAt || new Date();
    this._updatedAt = this._createdAt;
    this._deletedAt = null;
    this._createdBy = createdBy || null;
    this._updatedBy = null;
    this._deletedBy = null;
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  get createdBy(): string | null {
    return this._createdBy;
  }

  get updatedBy(): string | null {
    return this._updatedBy;
  }

  get deletedBy(): string | null {
    return this._deletedBy;
  }

  // Business methods
  markAsUpdated(updatedBy?: string): void {
    this._updatedAt = new Date();
    this._updatedBy = updatedBy || null;
  }

  markAsDeleted(deletedBy?: string): void {
    this._deletedAt = new Date();
    this._deletedBy = deletedBy || null;
  }

  restore(): void {
    this._deletedAt = null;
    this._deletedBy = null;
  }

  isDeleted(): boolean {
    return this._deletedAt !== null;
  }

  isActive(): boolean {
    return this._deletedAt === null;
  }

  // Audit info
  getAuditInfo(): {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    createdBy: string | null;
    updatedBy: string | null;
    deletedBy: string | null;
  } {
    return {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
      createdBy: this._createdBy,
      updatedBy: this._updatedBy,
      deletedBy: this._deletedBy,
    };
  }
}
