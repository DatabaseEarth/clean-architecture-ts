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
      throw new Error('Invalid address format');
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
