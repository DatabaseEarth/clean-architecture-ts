export class User {
    constructor(
        public readonly id: string,
        public email: string,
        public phone: string,
        public password: string,
        public fullName: string,
    ) { }
}
