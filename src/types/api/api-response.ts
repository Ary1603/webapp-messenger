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
  status: number
  code: string;
  messageCode: string;
  data?: ErrorData;
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

// === helpers de construcción de respuestas ===

export const mapHttpToErrorDescription = (status: number): ErrorDescription => {
  if (status >= 500) return "INTERNAL";
  if (status === 422) return "UNPROCESSABLE";
  if (status === 429) return "RATE_LIMITED";
  if (status === 409) return "CONFLICT";
  if (status === 404) return "NOT_FOUND";
  if (status === 403) return "FORBIDDEN";
  if (status === 401) return "UNAUTHORIZED";
  return "BAD_REQUEST";
};

type MetaExtras = Partial<
  MetaBase & {
    cache?: { hit: boolean; maxAge?: number };
    pagination?: PaginationMeta;
  }
>;

export const makeMeta = (overrides?: MetaExtras): PayloadResponse<unknown>["meta"] => {
  return {
    requestId:
      overrides?.requestId ??
      // crypto.randomUUID existe en Node 18+ y runtimes modernos
      (globalThis.crypto?.randomUUID?.() ?? "00000000-0000-0000-0000-000000000000"),
    timestamp: overrides?.timestamp ?? new Date().toISOString(),
    version: overrides?.version ?? "1.0.0",
    traceId: overrides?.traceId,
    locale: overrides?.locale,
    cache: overrides?.cache,
    pagination: overrides?.pagination,
  };
};

/**
 * Éxito: arma un ApiResponse<T> con meta consistente y sin errores.
 */
export function ok<T>(
  payload: T,
  metaOverrides?: MetaExtras
): ApiResponse<T> {
  return {
    data: {
      meta: makeMeta(metaOverrides),
      data: payload,
    },
    errors: [],
  };
}

/**
 * Error: arma un ApiResponse<never> con ApiError mapeado y meta consistente.
 * `messageCode` sirve para i18n en el cliente (p.ej. "AUTH_SIGNUP_FAILED").
 */
export function fail(
  status: number,
  messageCode: string,
  message: string,
  details?: unknown,
  causeId?: string,
  metaOverrides?: MetaExtras
): ApiResponse<never> {
  const description = mapHttpToErrorDescription(status);

  const error: ApiError = {
    status,
    code: description,        // opcionalmente podrías usar un código interno distinto
    messageCode,
    data: {
      description,
      httpStatus: status,
      message,
      details,
      causeId,
    },
  };

  return {
    data: {
      meta: makeMeta(metaOverrides),
      // Nota: como ApiResponse exige PayloadResponse<T>,
      // para fallos usamos `null as never` para no romper tipos en consumo.
      data: null as never,
    },
    errors: [error],
  };
}