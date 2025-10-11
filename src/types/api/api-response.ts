/** New code */
type UUID = string; // v4
type ISODateString = string; // ISO-8601
type ErrorDescription =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "UNPROCESSABLE"
  | "INTERNAL";

interface MetaBase {
  requestId: UUID;
  timestamp: ISODateString;
  version: string;
  traceId?: string;
  locale?: string;
}

interface PaginationMeta {
  kind: "cursor" | "offset";
  total?: number; // opcional en cursor
  nextCursor?: string;
  prevCursor?: string;
  limit: number;
}

interface ErrorData {
  description: ErrorDescription;
  httpStatus: number;
  message: string; // seguro para cliente (i18n-ready)
  details?: unknown; // para validación granular (ej. Zod)
  causeId?: string; // correlación interna de logs
}

export interface ApiError {
  code: string;
  messageCode: string;
  data: ErrorData;
}

export interface PayloadResponse<T> {
  meta: MetaBase & {
    cache?: { hit: boolean; maxAge?: number };
    pagination?: PaginationMeta;
  };
  data: T;
}

export interface ApiResponse<T> {
  data: PayloadResponse<T>;
  errors: ApiError[];
}

// src/lib/api/types.ts

/** Generic Api Response */
// export interface ApiResponse<T> {
//   data: T;
//   status: number;
//   message: string;
//   messageCode?: string;
// }

// export interface ApiSuccess<T> {
//   ok: true;
//   data: T;
//   meta: MetaBase & {
//     cache?: { hit: boolean; maxAge?: number };
//     pagination?: PaginationMeta;
//   };
// }

// export interface ApiFail {
//   ok: false;
//   messageCode: string,
//   error: ApiError;
//   meta: MetaBase;
// }

// export type ApiResponse2<T> = ApiSuccess<T> | ApiFail;

// export interface ApiError2 {
//   code:
//     | 'BAD_REQUEST'
//     | 'UNAUTHORIZED'
//     | 'FORBIDDEN'
//     | 'NOT_FOUND'
//     | 'CONFLICT'
//     | 'RATE_LIMITED'
//     | 'UNPROCESSABLE'
//     | 'INTERNAL';
//   httpStatus: number;
//   message: string;            // seguro para cliente (i18n-ready)
//   details?: unknown;          // para validación granular (ej. Zod)
//   causeId?: string;           // correlación interna de logs
// }
