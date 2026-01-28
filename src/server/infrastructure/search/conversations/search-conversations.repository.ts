import { SearchInput } from "@/server/application/search/conversations/search-conversations.input";
import { SearchInfraResult } from "../models/search-result.infra";
import { Pagination } from "@supabase/supabase-js";

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