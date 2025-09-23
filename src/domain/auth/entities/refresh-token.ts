export class RefreshToken {
    constructor(
        private readonly _id: string,
        private _userId: string,
        private _token: string,
        private _sessionId: string,
        private _deviceInfo?: string,
        private _ipAddress?: string,
    ) { }

    // Getters
    get id(): string {
        return this._id;
    }

    get userId(): string {
        return this._userId;
    }

    get token(): string {
        return this._token;
    }

    get sessionId(): string {
        return this._sessionId;
    }

    get deviceInfo(): string | undefined {
        return this._deviceInfo;
    }

    get ipAddress(): string | undefined {
        return this._ipAddress;
    }

    // Setters
    set userId(userId: string) {
        this._userId = userId;
    }

    set token(token: string) {
        this._token = token;
    }

    set sessionId(sessionId: string) {
        this._sessionId = sessionId;
    }

    set deviceInfo(deviceInfo: string | undefined) {
        this._deviceInfo = deviceInfo;
    }

    set ipAddress(ipAddress: string | undefined) {
        this._ipAddress = ipAddress;
    }
}
