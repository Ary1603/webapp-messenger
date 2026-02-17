import { SearchInfraResult } from "../models/search-result.infra";

export interface SearchRepository {
    searchConversations(input: {
        query: string;
        pagination: {
            limit: number;
            cursor: string | null;
        };
        //options?: 
    }): Promise<SearchInfraResult>;
}