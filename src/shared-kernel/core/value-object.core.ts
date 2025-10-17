import { ERROR_CODES, REGEX_PATTERNS } from "../constants";
import { ErrorCode } from "../enums/exception.enum";
import { BaseException } from "../exceptions";

export class Id {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new BaseException({
        code: ErrorCode.INVALID_FORMAT,
        message: `Mã ${value} không hợp lệ.`,
        httpStatus: ERROR_CODES[ErrorCode.INVALID_FORMAT].httpStatus,
      });
    }
  }

  private isValid(id: string): boolean {
    const uuidRegex = REGEX_PATTERNS.UUID;
    return uuidRegex.test(id);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Id): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}

export class Address {
  constructor(
    private readonly street: string,
    private readonly city: string,
    private readonly state: string,
    private readonly country: string,
    private readonly postalCode: string,
    private readonly apartment?: string
  ) {
    if (!this.isValid()) {
      throw new BaseException({
        code: ErrorCode.INVALID_FORMAT,
        message: `Địa chỉ ${this.getFullAddress()} không hợp lệ.`,
        httpStatus: ERROR_CODES[ErrorCode.INVALID_FORMAT].httpStatus,
      });
    }
  }

  private isValid(): boolean {
    return (
      this.street.length > 0 &&
      this.city.length > 0 &&
      this.state.length > 0 &&
      this.country.length > 0 &&
      this.postalCode.length > 0
    );
  }

  getStreet(): string {
    return this.street;
  }

  getCity(): string {
    return this.city;
  }

  getState(): string {
    return this.state;
  }

  getCountry(): string {
    return this.country;
  }

  getPostalCode(): string {
    return this.postalCode;
  }

  getApartment(): string | undefined {
    return this.apartment;
  }

  getFullAddress(): string {
    let address = `${this.street}`;
    if (this.apartment) {
      address += `, Apt ${this.apartment}`;
    }
    address += `, ${this.city}, ${this.state} ${this.postalCode}, ${this.country}`;
    return address;
  }

  equals(other: Address): boolean {
    return (
      this.street === other.street &&
      this.city === other.city &&
      this.state === other.state &&
      this.country === other.country &&
      this.postalCode === other.postalCode &&
      this.apartment === other.apartment
    );
  }

  toString(): string {
    return this.getFullAddress();
  }
}
