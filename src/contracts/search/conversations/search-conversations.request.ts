/**
 * Represents the pagination intent for searching conversations.
 * This is an application-level contract and must not depend on
 * HTTP, database, or infrastructure-specific concepts.
 */
export interface SearchConversationsPaginationRequest {
  /**
   * Maximum number of results to return.
   * Optional to allow backend defaults.
   */
  limit?: number;

  /**
   * Cursor used for cursor-based pagination.
   * Optional because the first page does not require it.
   */
  cursor?: string;
}

/**
 * Input contract for the search conversations use case.
 * Describes the user's intent to search across conversations.
 */
export interface SearchConversationsRequest {
  /**
   * Text query entered by the user.
   * This value is required to perform a search.
   */
  query: string;

  /**
   * Optional pagination configuration.
   */
  pagination?: SearchConversationsPaginationRequest;
}
