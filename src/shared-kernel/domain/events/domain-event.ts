export abstract class DomainEvent {
  public readonly occurredOn: Date;
  public readonly eventId: string;

  constructor(
    public readonly aggregateId: string,
    public readonly eventType: string,
    eventId?: string
  ) {
    this.occurredOn = new Date();
    this.eventId = eventId || this.generateEventId();
  }

  private generateEventId(): string {
    return `${this.eventType}_${this.aggregateId}_${Date.now()}`;
  }
}

// User Events
export class UserRegisteredEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly fullName: string,
    public readonly phone: string
  ) {
    super(userId, 'UserRegistered');
  }
}

export class UserLoggedInEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly sessionId: string,
    public readonly deviceInfo?: string,
    public readonly ipAddress?: string
  ) {
    super(userId, 'UserLoggedIn');
  }
}

export class UserUpdatedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly changes: Record<string, any>
  ) {
    super(userId, 'UserUpdated');
  }
}

export class UserDeletedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly deletedBy: string
  ) {
    super(userId, 'UserDeleted');
  }
}

// Order Events
export class OrderCreatedEvent extends DomainEvent {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly totalAmount: number,
    public readonly currency: string
  ) {
    super(orderId, 'OrderCreated');
  }
}

export class OrderUpdatedEvent extends DomainEvent {
  constructor(
    public readonly orderId: string,
    public readonly changes: Record<string, any>
  ) {
    super(orderId, 'OrderUpdated');
  }
}

export class OrderCancelledEvent extends DomainEvent {
  constructor(
    public readonly orderId: string,
    public readonly cancelledBy: string,
    public readonly reason?: string
  ) {
    super(orderId, 'OrderCancelled');
  }
}

// Product Events
export class ProductCreatedEvent extends DomainEvent {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly price: number,
    public readonly currency: string
  ) {
    super(productId, 'ProductCreated');
  }
}

export class ProductUpdatedEvent extends DomainEvent {
  constructor(
    public readonly productId: string,
    public readonly changes: Record<string, any>
  ) {
    super(productId, 'ProductUpdated');
  }
}

export class ProductDeletedEvent extends DomainEvent {
  constructor(
    public readonly productId: string,
    public readonly deletedBy: string
  ) {
    super(productId, 'ProductDeleted');
  }
}
