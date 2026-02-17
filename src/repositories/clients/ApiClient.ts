// src/repositories/clients/ApiClient.ts
import { type ApiError } from "@/utils/error/errorHandler"; // TODO: Validar si se puede remplazar por el de Api-response.ts
import type { RequestOptions } from "@/types/transport/http/api-request";
import type { ApiResponse } from "@/types/transport/http/api-response";

/* Empty string because Next.js internal routes are currently being handled. **/
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// Definimos un tipo genérico de respuesta estándar

async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
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

  const ok = res.ok;

  console.log(
    "Running on:",
    typeof window === "undefined" ? "SERVER" : "CLIENT"
  );
  let message = res.statusText;
  let messageCode: string | undefined;

  if (!ok) {
    console.log("La respuesta no fue ok");
    try {
      type ErrorEnvelope = {
        payload?: {
          errors?: Array<{
            message?: string;
            messageCode?: string;
          }>;
        };
      };

      const errorData = (await res.json()) as ErrorEnvelope;

      const firstError =
        Array.isArray(errorData?.payload?.errors) &&
        errorData.payload.errors.length > 0
          ? errorData.payload.errors[0]
          : null;

      message = firstError?.message ?? res.statusText;
      messageCode = firstError?.messageCode;
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

  const data = (await res.json()) as ApiResponse<T>;
  return data;
}

export const ApiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "GET" }),

  post: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method">
  ) => request<T>(path, { ...options, method: "POST", body }),

  put: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method">
  ) => request<T>(path, { ...options, method: "PUT", body }),

  patch: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method">
  ) => request<T>(path, { ...options, method: "PATCH", body }),

  delete: <T>(
    path: string,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(path, { ...options, method: "DELETE" }),
};
