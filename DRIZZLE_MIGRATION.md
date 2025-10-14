# Chuyển đổi từ TypeORM sang Drizzle ORM

## Tổng quan

Dự án đã được chuyển đổi từ TypeORM sang Drizzle ORM để có hiệu suất tốt hơn và type safety mạnh mẽ hơn.

## Cấu trúc mới

### Schema

- `src/infrastructure/database/drizzle/schema/` - Chứa các schema Drizzle
- `src/infrastructure/database/drizzle/schema/base.ts` - Base columns cho tất cả tables
- `src/infrastructure/database/drizzle/schema/users.ts` - User table schema
- `src/infrastructure/database/drizzle/schema/refresh-tokens.ts` - Refresh token table schema

### Repositories

- `src/infrastructure/database/drizzle/repositories/` - Drizzle repository implementations
- Hỗ trợ transaction thông qua Unit of Work pattern

### Configuration

- `src/infrastructure/database/drizzle/config.ts` - Database connection configuration
- `drizzle.config.ts` - Drizzle Kit configuration

## Scripts mới

```bash
# Generate migration
npm run db:generate

# Run migration
npm run db:migrate

# Push schema changes (development)
npm run db:push

# Open Drizzle Studio
npm run db:studio
```

## Migration từ TypeORM

### 1. Schema Changes

- TypeORM entities đã được chuyển đổi thành Drizzle schemas
- Base entity được chuyển thành base columns
- Relationships được xử lý thông qua foreign keys

### 2. Repository Changes

- TypeORM repositories đã được thay thế bằng Drizzle repositories
- Transaction support thông qua Unit of Work pattern
- Type safety được cải thiện với Drizzle's type inference

### 3. Module Changes

- DatabaseModule mới được tạo để quản lý tất cả database dependencies
- Các module khác đã được cập nhật để sử dụng Drizzle repositories

## Lợi ích của Drizzle

1. **Type Safety**: Type inference mạnh mẽ hơn TypeORM
2. **Performance**: Query builder tối ưu hơn
3. **Bundle Size**: Nhẹ hơn TypeORM
4. **SQL-like**: Syntax gần với SQL hơn
5. **Migration**: Drizzle Kit hỗ trợ migration tốt hơn

## Cách sử dụng

### Tạo migration mới

```bash
npm run db:generate
```

### Chạy migration

```bash
npm run db:migrate
```

### Development (push changes trực tiếp)

```bash
npm run db:push
```

### Mở Drizzle Studio

```bash
npm run db:studio
```

## Lưu ý

- Tất cả TypeORM code vẫn được giữ lại trong `src/infrastructure/database/typeorm/` để tham khảo
- Drizzle implementation được đặt trong `src/infrastructure/database/drizzle/`
- Các interface và domain logic không thay đổi
- Transaction support được cải thiện với Unit of Work pattern
