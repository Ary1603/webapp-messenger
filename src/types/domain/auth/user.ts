// export interface User {
//   id: string;
//   email?: string;
//   email_verified: boolean;
// }

// // src/domain/auth/session.ts
// export interface Session {
//   accessToken: string;
//   refreshToken: string;
//   expiresAt?: number;
// }

export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
}