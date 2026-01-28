/* Utils */
import { Search } from "@/server/application/search/conversations/search-conversations.usecase";
import { SupabaseAuthRepository } from "@/server/infrastructure/auth/supabase-auth.repository";
import { SupabaseChatsRepository } from "@/server/infrastructure/chats/supabase-chats.repository";
import { SupabaseSearch } from "@/server/infrastructure/search/conversations/supabase-search-conversations.repository";
import { webAppResponder } from "@/utils/api/responderHandler";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const authRepository = new SupabaseAuthRepository();
        const searchRepository = new SupabaseSearch();

        const searchParams = request.nextUrl.searchParams;

        const searchType = searchParams.get("searchType") ?? "";
        const query = searchParams.get("query") ?? "";
        const limitParam = searchParams.get("limit");
        const cursor = searchParams.get("cursor");

        const input = {
            searchType,
            query,
            pagination: {
                limit: limitParam ? Number(limitParam) : undefined,
                cursor: cursor ?? undefined
            }
            // options: {
            //     includeChats: true,
            //     includeUsers: true
            // }
        }

        const usecase = new Search(authRepository, searchRepository);

        const result = await usecase.execute(input)

    } catch (error: unknown) {
        console.error("Unexpected error on route search GET: ", error);
        return webAppResponder(null, ["CORE_INTERNAL_ERROR"]);
    }
}