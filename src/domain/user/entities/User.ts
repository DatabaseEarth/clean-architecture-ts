import { BaseEntity } from "@/shared-kernel/domain/entities/base.entity";
import { Email } from "@/shared-kernel/domain/value-objects/email.vo";
import { PhoneNumber } from "../value-objects/phone-number.vo";

export class User extends BaseEntity {
    private _email: Email;
    private _phone: PhoneNumber;
    private _password: string;
    private _fullName: string;

    constructor(
        id: string,
        email: Email,
        phone: PhoneNumber,
        password: string,
        fullName: string,
        createdAt?: Date,
        createdBy?: string | null
    ) {
        super(id, createdAt, createdBy);
        this._email = email;
        this._phone = phone;
        this._password = password;
        this._fullName = fullName;
    }

    // Getters
    get email(): string {
        return this._email.getValue();
    }

    get phone(): string {
        return this._phone.getValue();
    }

    get fullName(): string {
        return this._fullName;
    }

    get password(): string {
        return this._password;
    }

    // Business methods
    changeEmail(newEmail: Email, updatedBy?: string): void {
        this._email = newEmail;
        this.markAsUpdated(updatedBy);
    }

    changePhone(newPhone: PhoneNumber, updatedBy?: string): void {
        this._phone = newPhone;
        this.markAsUpdated(updatedBy);
    }

    updateProfile(fullName: string, updatedBy?: string): void {
        this._fullName = fullName;
        this.markAsUpdated(updatedBy);
    }

    changePassword(newPassword: string, updatedBy?: string): void {
        this._password = newPassword;
        this.markAsUpdated(updatedBy);
    }

    // Domain-specific methods
    getEmailObject(): Email {
        return this._email;
    }

    getPhoneObject(): PhoneNumber {
        return this._phone;
    }

    // Override for domain-specific validation
    markAsDeleted(deletedBy?: string): void {
        if (this.isDeleted()) {
            throw new Error('User is already deleted');
        }
        super.markAsDeleted(deletedBy);
    }
}
