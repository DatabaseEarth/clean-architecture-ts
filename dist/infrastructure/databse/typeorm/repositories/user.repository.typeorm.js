"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryTypeORM = void 0;
const user_1 = require("../../../../domain/user/entities/user");
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entities/user.entity");
class UserRepositoryTypeORM {
    constructor(dataSource = data_source_1.AppDataSource) {
        this.repository = dataSource.getRepository(user_entity_1.UserEntity);
    }
    async findByEmail(email) {
        const entity = await this.repository.findOne({ where: { email } });
        if (!entity)
            return null;
        return new user_1.User(entity.id, entity.email, entity.phone, entity.password, entity.fullName);
    }
    async findById(id) {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity)
            return null;
        return new user_1.User(entity.id, entity.email, entity.phone, entity.password, entity.fullName);
    }
    async save(user) {
        const entity = this.repository.create(user);
        await this.repository.save(entity);
        return user;
    }
}
exports.UserRepositoryTypeORM = UserRepositoryTypeORM;
//# sourceMappingURL=user.repository.typeorm.js.map