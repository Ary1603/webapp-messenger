// src/lib/api-client.ts
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

  if (!res.ok) {
    try {
      const errorData = await res.json();
      message = errorData?.message || errorData?.error || res.statusText;
    } catch {
      message = res.statusText;
    }
    throw {
      data: null as T,
      status: res.status,
      message,
    };
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