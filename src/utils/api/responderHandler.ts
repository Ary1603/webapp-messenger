// src/lib/api/responder.ts
import { NextResponse } from 'next/server';
import type { ApiResponse, PayloadResponse, ApiError } from '@/types/api/api-response';
import { getError } from '@/utils/error/mapServerError'; // ⬅️ import activado

// --- Sobrecargas ---
export function webAppResponder<T>(
  payload: PayloadResponse<T>,
  errors?: (ApiError | string)[]
): NextResponse<ApiResponse<T>>;

export function webAppResponder<T = never>(
  payload: null,
  errors: (ApiError | string)[]
): NextResponse<ApiResponse<T>>;

// --- Implementación concreta ---
export function webAppResponder<T>(
  payload: PayloadResponse<T> | null,
  errors: (ApiError | string)[] = []
) {
  const resolvedErrors: ApiError[] = errors.map((err) =>
    typeof err === 'string' ? getError(err) : err
  );

  const hasErrors = resolvedErrors.length > 0;

  const meta = {
    requestId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    version: process.env.WEBAPP_VERSION ?? '1.0',
  };

  // Si hay errores, devolvemos null como data y status HTTP apropiado
  const body: ApiResponse<T> = {
    data: hasErrors
      ? (null as unknown as PayloadResponse<T>)
      : {
          ...payload!,
          meta,
        },
    errors: resolvedErrors,
  };

  // Determinamos el código de estado según los errores (por defecto 400)
  let status = 200;
  if (hasErrors) {
    // Si algún error tiene código, priorízalo
    const firstError = resolvedErrors[0];
    status = typeof firstError?.status === 'number' ? firstError.status : 400;
  }

  return NextResponse.json(body, { status });
}