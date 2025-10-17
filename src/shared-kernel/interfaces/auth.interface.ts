export interface ICurrentUserPayload {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  sessionId: string;
  iat?: number;
  exp?: number;
}

export interface IAuthTokenPayload {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  sessionId: string;
}

export interface IAuthContext {
  user: ICurrentUserPayload;
  isAuthenticated: boolean;
  sessionId: string;
}
