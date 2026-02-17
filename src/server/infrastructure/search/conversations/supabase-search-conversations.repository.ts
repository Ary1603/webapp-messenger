import { SearchInfraResult } from "../models/search-result.infra";
import { SearchRepository } from "./search-conversations.repository";
import { SearchInfraErrorCode } from "../models/search-infra.error";
/* Supabase */
import { createClient } from "@/lib/supabase/server/server";

export class SupabaseSearch implements SearchRepository {
  async searchConversations(input: {
    query: string;
    pagination: {
      limit: number;
      cursor: string | null;
    };
    //options?:
  }): Promise<SearchInfraResult> {
    const { query, pagination } = input;

    const supabase = await createClient();

    const { data, error } = await supabase.rpc("search_conversations", {
      p_query: query,
      p_limit: pagination.limit,
    });

    if (error) {
      const message = error.message?.toLowerCase();

      if (message?.includes("unathorized")) {
        return {
          type: "ERROR",
          error: {
            errorCode: SearchInfraErrorCode.UNAUTHORIZED,
            errorData: error,
          },
        };
      }

      if (message?.includes("invalid_query")) {
        return {
          type: "ERROR",
          error: {
            errorCode: SearchInfraErrorCode.INVALID_QUERY,
            errorData: error,
          },
        };
      }

      return {
        type: "ERROR",
        error: {
          errorCode: SearchInfraErrorCode.DATABASE_ERROR,
          errorData: error,
        },
      };
    }

    return {
      type: "SUCCESS",
      data
    }
  }
}
