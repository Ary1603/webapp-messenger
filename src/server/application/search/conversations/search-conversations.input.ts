// application/search/search.input.ts juas juas
export interface SearchInput {
  query: string;
  pagination?: {
    limit?: number;
    cursor?: string;
  };
  options?: unknown;
}