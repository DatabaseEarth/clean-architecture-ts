import { Email } from "../value-objects/email.vo";
import { PhoneNumber } from "../value-objects/phone-number.vo";

export class User {
    constructor(
        private _id: string,
        private _email: Email,
        private _phone: PhoneNumber,
        private _password: string,
        private _fullName: string,
    ) { }

    // Getters
    get id(): string {
        return this._id;
    }

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

    // Setters
    set email(email: Email) {
        this._email = email;
    }

    set phone(phone: PhoneNumber) {
        this._phone = phone;
    }

    set fullName(fullName: string) {
        this._fullName = fullName;
    }

    set password(password: string) {
        this._password = password;
    }
}
