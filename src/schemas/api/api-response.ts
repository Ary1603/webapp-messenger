// src/lib/api/types.ts
export type UUID = string; // v4
export type ISODateString = string; // ISO-8601

export interface PaginationMeta {
  kind: 'cursor' | 'offset';
  total?: number;            // opcional en cursor
  nextCursor?: string;
  prevCursor?: string;
  limit: number;
}

export interface MetaBase {
  requestId: UUID;
  timestamp: ISODateString;
  version: '1.0';
  traceId?: string;
  locale?: string;
}

export interface ApiSuccess<T> {
  ok: true;
  data: T;
  meta: MetaBase & {
    cache?: { hit: boolean; maxAge?: number };
    pagination?: PaginationMeta;
  };
}

export interface ApiFail {
  ok: false;
  messageCode: string,
  error: ApiError;
  meta: MetaBase;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFail;

export interface ApiError {
  code:
    | 'BAD_REQUEST'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'NOT_FOUND'
    | 'CONFLICT'
    | 'RATE_LIMITED'
    | 'UNPROCESSABLE'
    | 'INTERNAL';
  httpStatus: number;
  message: string;            // seguro para cliente (i18n-ready)
  details?: unknown;          // para validación granular (ej. Zod)
  causeId?: string;           // correlación interna de logs
}