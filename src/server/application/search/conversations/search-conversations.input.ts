// application/search/search.input.ts
export interface SearchInput {
  searchType: string;
  query: string;
  pagination?: {
    limit?: number;
    cursor?: string;
  };
  options?: unknown;
}