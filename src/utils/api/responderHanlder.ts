// src/lib/api/responder.ts
import { NextResponse } from 'next/server';
import type { ApiError, ApiResponse, MetaBase, ApiSuccess } from '@/schemas/api/api-response';
import { getError } from '@/server/errors'; // ⬅️ nuevo
import type { ApiError as RegistryError } from '@/schemas/api/api-error'; // ⬅️ nuevo

const nowIso = () => new Date().toISOString();

export function successResponse<T>(
  data: T,
  meta: Partial<MetaBase> = {},
  extra: Partial<ApiSuccess<T>['meta']> = {}
) {
  const base: MetaBase = {
    requestId: meta.requestId ?? crypto.randomUUID(),
    timestamp: nowIso(),
    version: '1.0',
    traceId: meta.traceId,
    locale: meta.locale,
  };
  const body: ApiResponse<T> = {
    ok: true,
    data,
    meta: { ...base, ...extra },
  };
  return NextResponse.json(body, { status: 200 });
}

export function errorResponse(
  errorOrCode: (Omit<ApiError, 'httpStatus'> & { httpStatus?: number }) | string | RegistryError,
  meta: Partial<MetaBase> = {},
) {
  const base: MetaBase = {
    requestId: meta.requestId ?? crypto.randomUUID(),
    timestamp: nowIso(),
    version: '1.0',
    traceId: meta.traceId,
    locale: meta.locale,
  };

  // --- Normalización: unifica cualquier entrada al shape esperado por la respuesta ---
  const normalized = (() => {
    // Caso 1: string => buscar en el registry y mapear
    if (typeof errorOrCode === 'string') {
      const r = getError(errorOrCode); // { messageCode, message, status }
      console.log("Este es r: ", r);
      const response = {
        code: r.code,
        message: r.message,
        httpStatus: r.status,
        messageCode: r.messageCode
      };

      return response
    }

    // Caso 2: viene un error del registry (tiene messageCode y status)
    const maybeReg = errorOrCode as Partial<RegistryError>;
    if (typeof maybeReg.messageCode === 'string' && typeof maybeReg.status === 'number') {
      return {
        messageCode: '',
        code: maybeReg.messageCode!,
        message: maybeReg.message ?? 'Unexpected error',
        httpStatus: maybeReg.status!,
      };
    }

    // Caso 3: ya viene con el shape de ApiError de la respuesta
    const e = errorOrCode as Omit<ApiError, 'httpStatus'> & { httpStatus?: number };
    return {
      code: e.code,
      message: e.message,
      httpStatus: e.httpStatus,   // podría venir undefined; se resuelve más abajo
      details: e.details,
      causeId: e.causeId,
      messageCode: '',
    };
  })();

  const http = normalized.httpStatus ?? mapHttp(normalized.code as ApiError['code']);

  console.log("Este es el normalized: ", normalized);
  const body: ApiResponse<never> = {
    ok: false,
    messageCode: normalized.messageCode,
    error: {
      // garantizamos httpStatus y el resto de campos
      httpStatus: http,
      code: normalized.code as string,
      message: normalized.message ?? 'Unexpected error',
      // details: normalized.details,
      // causeId: normalized.causeId,
    } as unknown as ApiError, // compat: el tipo final coincide con el contrato de respuesta
    meta: base,
  };

  return NextResponse.json(body, { status: http });
}

function mapHttp(code: ApiError['code']): number {
  switch (code) {
    case 'BAD_REQUEST': return 400;
    case 'UNAUTHORIZED': return 401;
    case 'FORBIDDEN': return 403;
    case 'NOT_FOUND': return 404;
    case 'CONFLICT': return 409;
    case 'UNPROCESSABLE': return 422;
    case 'RATE_LIMITED': return 429;
    default: return 500;
  }
}


/***
 * Use function fail examples
 * * Ejemplo handler
 * if (!tokenValido) {
 *  return fail("AUTH.INVALID_TOKEN"); // lookup + mapeo + respuesta uniforme
 * }
 *
 * * O si capturas un error del registry:
 * catch (e) {
 *   return fail(getError("CORE.INTERNAL_ERROR"));
 * }
 *
 * * O el shape antiguo también sigue funcionando:
 * return fail({ code: 'UNPROCESSABLE', message: 'Payload inválido' });
 */