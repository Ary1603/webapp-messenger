// src/repositories/clients/ApiClient.ts
import { type ApiError } from '@/utils/error/errorHandler' // TODO: Validar si se puede remplazar por el de Api-response.ts
import type { RequestOptions } from '@/types/api/api-request';
import type { ApiResponse, PayloadResponse } from '@/types/api/api-response';

/* Empty string because Next.js internal routes are currently being handled. **/
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// Definimos un tipo genérico de respuesta estándar


async function request<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const { method = "GET", body, headers, next, cache } = options;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    next,
    cache,
  });

  const ok = res.ok
  

  let message = res.statusText;
  let messageCode: string | undefined;

  if (!ok) {
    console.log("ENtre");
    try {
      type ErrorEnvelope = {
        errors?: Array<{ message?: string; messageCode?: string }>;
        message?: string;
        error?: string;
        messageCode?: string;
      };
      const errorData = (await res.json()) as ErrorEnvelope;
      console.log("ApiClient errorData:", errorData);

      // Support error payloads with an `errors` array (may include multiple errors)
      const firstError = Array.isArray(errorData?.errors) && errorData.errors.length > 0
        ? errorData.errors[0]
        : null;

      // Prefer message/messageCode from the first error; fall back to legacy fields
      message = firstError?.message ?? errorData?.message ?? errorData?.error ?? res.statusText;
      messageCode = firstError?.messageCode ?? errorData?.messageCode;
    } catch {
      message = res.statusText;
    }

    console.log("res de error: ", res);
    const apiError: ApiError<T> = {
      messageCode,
      data: null as T,
      status: res.status,
      message,
    };

    //errorHandler(apiError);

    console.log("Linea 52 apiError: ", apiError);
    // Re-lanzamos para que el caller pueda romper el flujo si quiere
    throw apiError;
  }

  // if (res.status === 204) {
  //   return {
  //     data: {} as T,
  //     status: res.status,
  //     message,
  //   };
  // }

  //const data = (await res.json()) as T;
  //console.log("ApiClient data linea 62: ", data);

  const data = (await res.json()) as T;
  console.log("ApiClient linea 68 viendo que trae data: ", data);

  return {
    data: data as PayloadResponse<T>,
    errors: []
    //messageCode,
    //data,
    // status: res.status,
    // message,
  };
}

export const ApiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...options, method: "POST", body }),

  put: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...options, method: "PUT", body }),

  patch: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...options, method: "PATCH", body }),

  delete: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "DELETE" }),
};