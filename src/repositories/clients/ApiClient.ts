// src/repositories/clients/ApiClient.ts
import { errorHandler, type ApiError } from '@/utils/error/errorHandler'

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  next?: { revalidate?: number | false; tags?: string[] };
  cache?: RequestCache;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
// ⚡ Si usas rutas internas de Next.js (ej: /api/auth/login), puedes dejarlo vacío

// Definimos un tipo genérico de respuesta estándar
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  messageCode?: string;
}

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

  let message = res.statusText;
  let messageCode: string | undefined;

  if (!res.ok) {
    try {
      const errorData = await res.json();
      // console.debug("ApiClient errorData:", errorData);
      message = errorData?.message || errorData?.error || res.statusText;
      messageCode = errorData?.messageCode;
    } catch {
      message = res.statusText;
    }

    const apiError: ApiError<T> = {
      messageCode,
      data: null as T,
      status: res.status,
      message,
    };

    //errorHandler(apiError);

    // Re-lanzamos para que el caller pueda romper el flujo si quiere
    throw apiError;
  }

  if (res.status === 204) {
    return {
      data: {} as T,
      status: res.status,
      message,
    };
  }

  const data = (await res.json()) as T;

  return {
    messageCode,
    data,
    status: res.status,
    message,
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