# 🏗️ Clean Architecture & DDD Implementation Guide

> **Một hướng dẫn toàn diện về kiến trúc Clean Architecture kết hợp Domain-Driven Design (DDD) trong dự án NestJS TypeScript**

---

## 📋 Mục lục

- [🎯 Tổng quan kiến trúc](#-tổng-quan-kiến-trúc)
- [🧩 Nguyên lý thiết kế](#-nguyên-lý-thiết-kế)
- [🏗️ Mẫu kiến trúc](#️-mẫu-kiến-trúc)
- [🔧 Triển khai cụ thể](#-triển-khai-cụ-thể)
- [🧠 Quyết định thiết kế](#-quyết-định-thiết-kế)
- [🚀 Mở rộng tương lai](#-mở-rộng-tương-lai)

---

## 🎯 Tổng quan kiến trúc

### **Kiến trúc tổng thể**

Dự án áp dụng **Clean Architecture** kết hợp **Domain-Driven Design (DDD)** với hỗ trợ **Dependency Injection (DI)** từ NestJS và **Separation of Concerns (SoC)** qua 4 tầng chính + shared kernel.

```
src/
├── 🧠 domain/           # Entities, Aggregates, Value Objects, Domain Logic
├── 🎯 application/      # Use Cases (Service/Application Layer)
├── 🔧 infrastructure/   # Repository, ORM, External Services
├── 🎨 presentation/     # Controller, Guard, DTO, Interceptor (API Layer)
└── 🧩 shared-kernel/    # Common types, Result, Exception, Validation, Utils
```

### **Dependency Flow**

```
Presentation → Application → Domain ← Infrastructure
     ↓              ↓           ↑           ↑
Shared Kernel ←───────────────→ Shared Kernel
```

**Nguyên tắc:** Tầng trong không phụ thuộc tầng ngoài, chỉ phụ thuộc vào abstractions.

---

## 🧩 Nguyên lý thiết kế

### **1. SOLID Principles**

| Nguyên lý                     | Mô tả                                           | Ứng dụng trong dự án                                 |
| ----------------------------- | ----------------------------------------------- | ---------------------------------------------------- |
| **S** - Single Responsibility | Mỗi lớp có đúng một nhiệm vụ                    | UserEntity, EmailValueObject, LoginUseCase           |
| **O** - Open/Closed           | Dễ mở rộng, không sửa mã cũ                     | Interface IUserRepository, ITokenService             |
| **L** - Liskov Substitution   | Interface cho phép thay thế implementation      | RedisCacheService ↔ MemoryCacheService              |
| **I** - Interface Segregation | Tách biệt interface rõ ràng                     | ICacheService, ILogger, IConfigService               |
| **D** - Dependency Inversion  | Phụ thuộc abstraction, không phụ thuộc concrete | Domain chỉ biết interface, không biết implementation |

### **2. Design Patterns**

| Pattern                  | Mô tả                             | Ví dụ                                        |
| ------------------------ | --------------------------------- | -------------------------------------------- |
| **Repository Pattern**   | Trừu tượng hóa data access        | IUserRepository → UserRepositoryTypeORM      |
| **Value Object Pattern** | Đối tượng bất biến với validation | Email, PhoneNumber                           |
| **Command Pattern**      | Encapsulate request thành object  | LoginUseCase, RegisterUseCase                |
| **Mapper Pattern**       | Chuyển đổi giữa layers            | UserMapper (Domain ↔ Infrastructure)        |
| **Guard Pattern**        | Bảo vệ endpoints                  | JwtAuthGuard                                 |
| **Result Pattern**       | Xử lý success/error               | RestResponse.success(), RestResponse.error() |

### **3. Domain-Driven Design (DDD)**

#### **Entities**

Entities là các đối tượng có identity và lifecycle. Chúng chứa business logic và có thể thay đổi trạng thái theo thời gian. Ví dụ: User entity có thể thay đổi email, cập nhật profile, hoặc thay đổi mật khẩu.

#### **Value Objects**

Value Objects là các đối tượng bất biến (immutable) được định nghĩa bởi giá trị của chúng. Chúng không có identity và thường chứa validation logic. Ví dụ: Email, PhoneNumber, Address.

#### **Repository Interfaces**

Repository interfaces định nghĩa contract cho data access mà không phụ thuộc vào implementation cụ thể. Điều này cho phép dễ dàng thay đổi database hoặc ORM mà không ảnh hưởng đến business logic.

---

## 🏗️ Mẫu kiến trúc

### **1. Clean Architecture (Onion Architecture)**

```
┌─────────────────────────────────────┐
│ 🎨 Presentation Layer               │
│ ├── Controllers                     │
│ ├── Guards                          │
│ ├── Interceptors                    │
│ └── DTOs                            │
├─────────────────────────────────────┤
│ 🎯 Application Layer                │
│ ├── Use Cases                       │
│ ├── Services                        │
│ └── Ports (Interfaces)              │
├─────────────────────────────────────┤
│ 🧠 Domain Layer                     │
│ ├── Entities                        │
│ ├── Value Objects                   │
│ ├── Domain Services                 │
│ └── Repository Interfaces           │
├─────────────────────────────────────┤
│ 🔧 Infrastructure Layer             |
│ ├── Repositories                    │
│ ├── External Services               │
│ ├── Database                        │
│ └── Cache                           │
└─────────────────────────────────────┘
```

### **2. Hexagonal Architecture (Ports & Adapters)**

```
Domain (Core)
    ↕
Ports (Interfaces)
    ↕
Adapters (Implementations)
```

**Ports (Interfaces):**

- IUserRepository
- ITokenService
- ICacheService
- ILogger

**Adapters (Implementations):**

- UserRepositoryTypeORM
- JwtTokenService
- RedisCacheService
- PinoLoggerService

---

## 🔧 Triển khai cụ thể

### **1. NestJS Module Structure**

Mỗi module trong NestJS được tổ chức theo nguyên tắc Single Responsibility, chứa các providers, controllers và exports cần thiết. Module Auth chứa tất cả logic liên quan đến authentication, bao gồm use cases, guards và services.

### **2. Dependency Injection Flow**

Hệ thống sử dụng Dependency Injection của NestJS để quản lý dependencies. Interface được định nghĩa trong application layer, implementation được cung cấp trong infrastructure layer, và được inject vào use cases thông qua constructor.

### **3. Use Case Implementation**

Use cases đại diện cho các business operations cụ thể. Chúng nhận input từ presentation layer, thực hiện business logic với domain entities, và trả về kết quả. Mỗi use case có một responsibility duy nhất và có thể được test độc lập.

---

## 🧠 Quyết định thiết kế

### **✅ Những gì đã áp dụng**

| Quyết định                        | Lý do                              | Lợi ích                             |
| --------------------------------- | ---------------------------------- | ----------------------------------- |
| **Domain logic thuần TypeScript** | Dễ test, không phụ thuộc framework | Có thể di chuyển sang ngôn ngữ khác |
| **Mapper pattern**                | Tách biệt Domain và Infrastructure | Dễ đổi ORM, database                |
| **Interface cho Infrastructure**  | Cho phép thay đổi implementation   | RedisCache ↔ MemoryCache           |
| **Shared Kernel**                 | Consistency toàn hệ thống          | Tránh duplication, dễ maintain      |
| **BaseEntity**                    | Tự động quản lý audit, versioning  | Audit trail, soft delete            |
| **Value Objects với validation**  | Fail fast principle                | Tránh lỗi propagate                 |

### **❌ Những gì đã loại bỏ**

| Pattern             | Lý do loại bỏ         | Thay thế bằng        |
| ------------------- | --------------------- | -------------------- |
| **Factory Pattern** | DI của NestJS đủ mạnh | Dependency Injection |
| **Domain Events**   | Chưa cần thiết        | Có thể thêm sau      |
| **CQRS phức tạp**   | Over-engineering      | Use Case đơn giản    |
| **Event Bus**       | Tăng complexity       | Direct method calls  |

---

## 🧩 Shared Kernel Layer

### **Mục đích**

Cung cấp nền tảng dùng chung, không phụ thuộc domain nào, được tất cả tầng sử dụng.

### **Cấu trúc**

```
shared-kernel/
├── 🎯 core/              # BaseEntity, ValueObject
├── 🚨 exceptions/        # BaseException, DomainException
├── 📊 enums/             # ErrorCode, Status
├── 🔧 interfaces/        # Common interfaces
├── 📦 constants/         # Error codes, Validation messages
├── 🛠️ utils/             # DateTime, String utilities
├── 📋 requests/          # Pagination, Base request
└── 📤 responses/         # RestResponse, GraphQLResponse
```

### **Lợi ích**

- **Consistency**: Đảm bảo format response, exception handling nhất quán
- **Reusability**: Các utility functions được sử dụng across toàn bộ application
- **Maintainability**: Thay đổi ở một nơi, update everywhere
- **Type Safety**: TypeScript interfaces đảm bảo type safety

---

## 🚀 Mở rộng tương lai

### **1. Event-Driven Architecture**

Hệ thống có thể được mở rộng để hỗ trợ Domain Events, cho phép các bounded contexts giao tiếp với nhau thông qua events. Điều này giúp tăng tính loose coupling và scalability.

### **2. CQRS nâng cao**

Command Query Responsibility Segregation có thể được áp dụng để tách biệt read và write operations, giúp tối ưu performance và scalability cho các hệ thống lớn.

### **3. Microservices**

Domain logic được thiết kế độc lập, có thể dễ dàng tách thành các microservices riêng biệt. Mỗi service sẽ có database riêng và giao tiếp thông qua APIs.

### **4. Multi-tenancy**

Hệ thống có thể được mở rộng để hỗ trợ multi-tenancy, cho phép một instance phục vụ nhiều tenants với data isolation hoàn toàn.

---

## 📊 So sánh với các kiến trúc khác

| Aspect                     | Clean Architecture | MVC        | Layered Architecture |
| -------------------------- | ------------------ | ---------- | -------------------- |
| **Testability**            | ⭐⭐⭐⭐⭐         | ⭐⭐⭐     | ⭐⭐⭐               |
| **Maintainability**        | ⭐⭐⭐⭐⭐         | ⭐⭐       | ⭐⭐⭐               |
| **Scalability**            | ⭐⭐⭐⭐⭐         | ⭐⭐       | ⭐⭐⭐               |
| **Framework Independence** | ⭐⭐⭐⭐⭐         | ⭐         | ⭐⭐                 |
| **Learning Curve**         | ⭐⭐               | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐             |

---

## 🎯 Tóm tắt

Dự án hiện tại đang:

✅ **Áp dụng Clean Architecture + DDD-lite + Hexagonal**  
✅ **Triển khai đầy đủ SOLID principles**  
✅ **Có Separation of Concerns cực tốt**  
✅ **Không lệ thuộc framework, dễ mở rộng**  
✅ **Có thể cross-language (domain pure)**  
✅ **Shared kernel được thiết kế chuẩn enterprise**

### **Kết quả đạt được:**

- 🧠 **Domain logic** hoàn toàn độc lập
- 🔧 **Infrastructure** dễ thay đổi
- 🎨 **Presentation** linh hoạt
- 🧩 **Shared kernel** consistency
- 🚀 **Scalability** cao
- 🧪 **Testability** tốt

---

## 📚 Tài liệu tham khảo

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design - Eric Evans](https://domainlanguage.com/ddd/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**💡 Lưu ý:** Kiến trúc này được thiết kế để phát triển lâu dài, dễ maintain và scale. Mọi thay đổi đều có thể thực hiện mà không ảnh hưởng đến business logic core.
