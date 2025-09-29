export abstract class DomainException extends Error {
  abstract readonly code: string;
  
  constructor(message: string, public readonly details?: any) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidCredentialsException extends DomainException {
  readonly code = 'INVALID_CREDENTIALS';
  
  constructor() {
    super('Invalid credentials provided');
  }
}

export class EmailAlreadyExistsException extends DomainException {
  readonly code = 'EMAIL_ALREADY_EXISTS';
  
  constructor(email: string) {
    super(`Email ${email} already exists`);
  }
}

export class UserNotFoundException extends DomainException {
  readonly code = 'USER_NOT_FOUND';
  
  constructor(identifier: string) {
    super(`User with identifier ${identifier} not found`);
  }
}

export class InvalidEmailFormatException extends DomainException {
  readonly code = 'INVALID_EMAIL_FORMAT';
  
  constructor(email: string) {
    super(`Invalid email format: ${email}`);
  }
}

export class InvalidPhoneNumberException extends DomainException {
  readonly code = 'INVALID_PHONE_NUMBER';
  
  constructor(phone: string) {
    super(`Invalid phone number format: ${phone}`);
  }
}
