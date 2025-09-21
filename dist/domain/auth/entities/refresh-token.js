"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
class RefreshToken {
    constructor(id, userId, token, sessionId, deviceInfo, ipAddress) {
        this.id = id;
        this.userId = userId;
        this.token = token;
        this.sessionId = sessionId;
        this.deviceInfo = deviceInfo;
        this.ipAddress = ipAddress;
    }
}
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=refresh-token.js.map