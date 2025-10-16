# 🏗️ Clean Architecture & DDD Project

## 📋 Mô tả dự án

Dự án implement **Clean Architecture** kết hợp với **Domain-Driven Design (DDD)** patterns, sử dụng **NestJS** framework và **TypeScript**. Kiến trúc được thiết kế để dễ bảo trì, mở rộng và phù hợp cho các dự án enterprise.

## 🛠️ Công nghệ sử dụng

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **Validation**: class-validator, class-transformer
- **Testing**: Jest
- **Documentation**: Swagger

## 📁 Cấu trúc thư mục

> 📖 **Chi tiết kiến trúc**: Xem [ARCHITECTURE.md](./ARCHITECTURE.md) để hiểu rõ hơn về Clean Architecture & DDD patterns

```
src/
├── domain/                    # 🧠 Domain Layer
│   ├── auth/                  # Auth Bounded Context
│   │   ├── entities/          # RefreshToken entity
│   │   ├── repositories/      # Repository interfaces
│   │   └── value-objects/     # Auth value objects
│   └── user/                  # User Bounded Context
│       ├── entities/          # User entity
│       ├── repositories/      # User repository interface
│       └── value-objects/     # Email, PhoneNumber VOs
├── application/               # 🎯 Application Layer
│   ├── auth/                 # Auth use cases
│   │   ├── dtos/             # Request/Response DTOs
│   │   ├── services/         # Auth services
│   │   └── use-case/         # Login, Register use cases
│   ├── user/                 # User use cases
│   │   └── use-cases/        # Get user use cases
│   └── ports/                # Interface contracts
│       ├── cache/            # Cache interface
│       ├── config/           # Config interface
│       ├── logger/           # Logger interface
│       ├── security/         # Hash, Token, UUID interfaces
│       └── transaction/     # Transaction interfaces
├── infrastructure/           # 🏗️ Infrastructure Layer
│   ├── cache/                # Redis implementation
│   ├── config/               # Joi config validation
│   ├── database/             # TypeORM implementation
│   │   ├── entities/          # TypeORM entities
│   │   ├── mappers/          # Domain ↔ TypeORM mapping
│   │   └── repositories/     # Repository implementations
│   ├── logger/               # Pino logger
│   └── security/            # Bcrypt, JWT, Crypto services
├── presentation/             # 🌐 Presentation Layer
│   └── nestjs/              # NestJS application
│       └── src/
│           ├── auth/         # Auth controllers & modules
│           ├── common/       # Shared components
│           ├── core/         # Core modules
│           └── modules/      # Feature modules
└── shared-kernel/           # 🔗 Shared Kernel
    ├── constants/            # Error codes, regex, validation
    ├── core/                # Base entity, value object
    ├── enums/               # Exception, status enums
    ├── exceptions/          # Base exceptions
    ├── responses/           # Response formats
    ├── utils/               # Utility functions
    └── validations/         # Validation messages
```

## 🚀 Cài đặt và chạy dự án

### 1. Yêu cầu hệ thống

- Node.js >= 18.0.0
- npm >= 8.0.0
- PostgreSQL >= 13.0

### 2. Clone repository

```bash
git clone <repository-url>
cd clean-architecture-ts
```

### 3. Cài đặt dependencies

```bash
npm install
```

### 4. Cấu hình môi trường

```bash
cp .env.example .env
```

Cập nhật các biến môi trường trong file `.env`:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=clean_architecture_db

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# Application
PORT=3000
NODE_ENV=development
```

### 5. Setup database

```bash
# Tạo database
createdb clean_architecture_db

# Chạy migrations (nếu có)
npm run migration:run
```

### 6. Chạy dự án

```bash
# Development mode
npm run nest:dev

# Production mode
npm run nest:prod

# Debug mode
npm run nest:debug
```

### 7. Chạy tests

```bash
# Unit tests
npm run test

# Tests in watch mode
npm run test:watch
```

## 📚 API Documentation

Sau khi chạy dự án, truy cập Swagger documentation tại:

```
http://localhost:3000/api-doc
```

## 🎯 Các tính năng chính

### ✅ Authentication

- User registration
- User login
- JWT token generation
- Password hashing

### ✅ User Management

- User profile management
- Email validation
- Phone number validation

### ✅ Clean Architecture

- Domain-driven design
- Dependency inversion
- Interface segregation
- Single responsibility

## 📦 Scripts có sẵn

```bash
# Development
npm run nest:dev           # Chạy development server với watch mode
npm run nest:debug         # Chạy với debug mode

# Production
npm run nest:build         # Build production
npm run nest:prod          # Chạy production server

# Testing
npm run test               # Chạy unit tests
npm run test:watch         # Chạy tests trong watch mode

# Code Quality
npm run lint               # Chạy ESLint và fix errors
npm run format             # Format code với Prettier
```

## 🔧 Development

### Thêm tính năng mới

1. **Tạo Domain Entity**:

   ```bash
   # Tạo entity trong domain layer
   touch src/domain/your-context/entities/your-entity.ts
   ```

2. **Tạo Use Case**:

   ```bash
   # Tạo use case trong application layer
   touch src/application/your-context/use-case/your-usecase.ts
   ```

3. **Tạo Controller**:
   ```bash
   # Tạo controller trong presentation layer
   touch src/presentation/nestjs/src/your-context/your.controller.ts
   ```

### Code Style

Dự án sử dụng:

- **ESLint** cho code linting với TypeScript rules
- **Prettier** cho code formatting
- **Jest** cho unit testing
- **TypeScript** cho type safety

## 🎯 Design Patterns được sử dụng

> 📖 **Chi tiết patterns**: Xem [ARCHITECTURE.md](./ARCHITECTURE.md#-nguyên-lý-thiết-kế) để hiểu rõ hơn về SOLID principles và Design Patterns

- **Entity Pattern**: Rich domain objects với business logic
- **Value Object Pattern**: Immutable objects với validation
- **Repository Pattern**: Abstract data access
- **Use Case Pattern**: Business operations
- **Port Pattern**: Interface contracts
- **Adapter Pattern**: External service wrappers
- **Factory Pattern**: Object creation
- **Domain Events**: Event-driven architecture
- **Specification Pattern**: Business rules
- **Domain Services**: Complex business logic

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

---

**Happy Coding! 🚀**
