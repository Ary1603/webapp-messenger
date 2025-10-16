type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  next?: { revalidate?: number | false; tags?: string[] };
  cache?: RequestCache;
}