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
