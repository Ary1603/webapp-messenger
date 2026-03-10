import { SearchUsersNConversations } from "@/server/application/search/users-n-conversations/get-users-n-conversations-usecase";
import { ChatInfraRepository } from "@/server/infrastructure/supabase/repositories/chat.infra-repository";
import { UserInfraRepository } from "@/server/infrastructure/supabase/repositories/user.infta-repository";
import { webAppResponder } from "@/utils/api/responderHandler";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userRepository = new UserInfraRepository();
        const chatRepository = new ChatInfraRepository();
    
        const searchParams = request.nextUrl.searchParams;

        const query = searchParams.get("query") ?? null;

        const usecase = new SearchUsersNConversations(chatRepository, userRepository);

        const input = {
            query
        }

        const response = await usecase.execute(input);

        if(!response.success) {
            const errors = [];
            errors.push(response.data.errorCode);
            return webAppResponder(null, errors);
        }

        return webAppResponder(response);

    } catch (error) {
        console.error("[GET search/users-n-chats]: Error -> ", error);
        return webAppResponder(null, ["CORE_INTERNAL_ERROR"])
    }
}