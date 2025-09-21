"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenEntity = void 0;
const typeorm_1 = require("typeorm");
const abstracts_1 = require("../abstracts");
const user_entity_1 = require("./user.entity");
let RefreshTokenEntity = class RefreshTokenEntity extends abstracts_1.BaseEntity {
};
exports.RefreshTokenEntity = RefreshTokenEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], RefreshTokenEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token', type: 'varchar', length: 500, nullable: false }),
    __metadata("design:type", String)
], RefreshTokenEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'session_id', type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], RefreshTokenEntity.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_info', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], RefreshTokenEntity.prototype, "deviceInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_address', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], RefreshTokenEntity.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.id, {
        onDelete: 'CASCADE',
        createForeignKeyConstraints: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], RefreshTokenEntity.prototype, "user", void 0);
exports.RefreshTokenEntity = RefreshTokenEntity = __decorate([
    (0, typeorm_1.Entity)('refresh_tokens')
], RefreshTokenEntity);
//# sourceMappingURL=refresh-token.entity.js.map