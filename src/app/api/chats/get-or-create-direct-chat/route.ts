import { NextRequest } from "next/server";
import { getJSONBody } from "@/utils/parse/getJSONBody";
import { webAppResponder } from "@/utils/api/responderHandler";
import { ChatInfraRepository } from "@/server/infrastructure/supabase/repositories/chat.infra-repository";
import { GetOrCreateDirectChatUsecase } from "@/server/application/chats/get-or-create-direct-chat/get-or-create-direct-chat.usecase";

export async function POST(request: NextRequest) {
  try {
    const chatRepository = new ChatInfraRepository();

    const body = await getJSONBody(request);
    if(!body) return webAppResponder(null, ["CORE_INVALID_JSON"]);

    const usecase = new GetOrCreateDirectChatUsecase(chatRepository);

    const response = await usecase.execute(body);
    return webAppResponder({
      data: response
    })
  } catch (error) {
    console.error("Unexpected error on route chats/get-create-direct-chat POST: ", error);
    return webAppResponder(null, ["CORE_INTERNAL_ERROR"]);
  }
}
