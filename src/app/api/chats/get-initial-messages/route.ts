/* Utils */
import { webAppResponder } from "@/utils/api/responderHandler";
/* Use cases */
import { ChatInfraRepository } from "@/server/infrastructure/supabase/repositories/chat.infra-repository";
import { GetChatInitialMessagesUsecase } from "@/server/application/chats/get-initial-messages/get-initial-messages.usecase";
import { NextRequest } from "next/server";
import { getJSONBody } from "@/utils/parse/getJSONBody";

export async function POST(request: NextRequest) {
  try {
    const chatsRepository = new ChatInfraRepository();

    const body = await getJSONBody(request);

    const useCase = new GetChatInitialMessagesUsecase(chatsRepository);

    const usecaseResponse = await useCase.execute(body);

    if (!usecaseResponse.success) {
      const errors = [];
      errors.push(usecaseResponse.data.errorCode);
      return webAppResponder(null, errors);
    }

    return webAppResponder(usecaseResponse);
  } catch (err: unknown) {
    console.error("Error on chats petition GET: ", err);
    return webAppResponder(null, ["CORE_INTERNAL_ERROR"]);
  }
}
