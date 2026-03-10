import { type ApiError } from "@/utils/error/errorHandler";
import type { RequestOptions } from "@/types/transport/http/api-request";
import type { ApiResponse } from "@/types/transport/http/api-response";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

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
  let message = res.statusText;
  let messageCode: string | undefined;

  if (!ok) {
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
