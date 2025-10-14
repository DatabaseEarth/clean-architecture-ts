# Shared Kernel - Interfaces

## 🎯 Mục đích

Shared Kernel chứa các **interfaces và types chung** được sử dụng across toàn bộ application, đảm bảo tính nhất quán và type safety.

## 📁 Cấu trúc

```
src/shared-kernel/interfaces/
├── auth.interface.ts     # Authentication interfaces
├── index.ts              # Export tất cả interfaces
└── README.md            # Documentation
```

## 🔧 Cách sử dụng

### 1. **Authentication Interfaces**

```typescript
// ICurrentUserPayload - Interface cho user info trong request
interface ICurrentUserPayload {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  sessionId: string;
  iat?: number;
  exp?: number;
}

// IAuthTokenPayload - Interface cho JWT token payload
interface IAuthTokenPayload {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  sessionId: string;
}

// IAuthContext - Interface cho auth context
interface IAuthContext {
  user: ICurrentUserPayload;
  isAuthenticated: boolean;
  sessionId: string;
}
```

### 2. **Import và sử dụng**

```typescript
// Trong presentation layer
import { ICurrentUserPayload } from '@/shared-kernel/interfaces';

@Get('profile')
async getProfile(@CurrentUser() user: ICurrentUserPayload) {
  // user có type safety
  return user;
}
```

## 🏛️ Clean Architecture Benefits

- ✅ **Type Safety**: Đảm bảo type consistency across layers
- ✅ **Reusability**: Có thể sử dụng ở bất kỳ layer nào
- ✅ **Maintainability**: Thay đổi interface ở một nơi, update everywhere
- ✅ **Domain Knowledge**: Chứa domain concepts chung
