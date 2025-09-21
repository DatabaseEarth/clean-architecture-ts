export class RefreshToken {
    constructor(
        public readonly id: string,
        public userId: string,
        public token: string,
        public sessionId: string,
        public deviceInfo?: string,
        public ipAddress?: string,
    ) { }
}
