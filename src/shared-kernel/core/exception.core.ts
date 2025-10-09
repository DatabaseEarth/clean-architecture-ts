export abstract class CoreException extends Error {
  abstract readonly code: string;
  public readonly details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.details = details;
  }
}

// Common Exceptions
export class ValidationException extends CoreException {
  readonly code = "VALIDATION_ERROR";

  constructor(message: string, field?: string) {
    super(message, { field });
  }
}

export class NotFoundException extends CoreException {
  readonly code = "NOT_FOUND";

  constructor(entity: string, identifier: string) {
    super(`${entity} with identifier ${identifier} not found`, {
      entity,
      identifier,
    });
  }
}

export class AlreadyExistsException extends CoreException {
  readonly code = "ALREADY_EXISTS";

  constructor(entity: string, field: string, value: string) {
    super(`${entity} with ${field} '${value}' already exists`, {
      entity,
      field,
      value,
    });
  }
}

export class BusinessRuleException extends CoreException {
  readonly code = "BUSINESS_RULE_VIOLATION";

  constructor(message: string, rule?: string) {
    super(message, { rule });
  }
}

// User Exceptions
export class InvalidCredentialsException extends CoreException {
  readonly code = "INVALID_CREDENTIALS";

  constructor() {
    super("Invalid credentials provided");
  }
}

export class EmailAlreadyExistsException extends CoreException {
  readonly code = "EMAIL_ALREADY_EXISTS";

  constructor(email: string) {
    super(`Email ${email} already exists`, { email });
  }
}

export class UserNotFoundException extends CoreException {
  readonly code = "USER_NOT_FOUND";

  constructor(identifier: string) {
    super(`User with identifier ${identifier} not found`, { identifier });
  }
}

export class InvalidEmailFormatException extends CoreException {
  readonly code = "INVALID_EMAIL_FORMAT";

  constructor(email: string) {
    super(`Invalid email format: ${email}`, { email });
  }
}

export class InvalidPhoneNumberException extends CoreException {
  readonly code = "INVALID_PHONE_NUMBER";

  constructor(phone: string) {
    super(`Invalid phone number format: ${phone}`, { phone });
  }
}

// Order Exceptions
export class OrderNotFoundException extends CoreException {
  readonly code = "ORDER_NOT_FOUND";

  constructor(orderId: string) {
    super(`Order with ID ${orderId} not found`, { orderId });
  }
}

export class OrderAlreadyCancelledException extends CoreException {
  readonly code = "ORDER_ALREADY_CANCELLED";

  constructor(orderId: string) {
    super(`Order ${orderId} is already cancelled`, { orderId });
  }
}

export class InsufficientStockException extends CoreException {
  readonly code = "INSUFFICIENT_STOCK";

  constructor(productId: string, requested: number, available: number) {
    super(
      `Insufficient stock for product ${productId}. Requested: ${requested}, Available: ${available}`,
      { productId, requested, available }
    );
  }
}

// Product Exceptions
export class ProductNotFoundException extends CoreException {
  readonly code = "PRODUCT_NOT_FOUND";

  constructor(productId: string) {
    super(`Product with ID ${productId} not found`, { productId });
  }
}

export class ProductAlreadyExistsException extends CoreException {
  readonly code = "PRODUCT_ALREADY_EXISTS";

  constructor(sku: string) {
    super(`Product with SKU ${sku} already exists`, { sku });
  }
}
