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

    console.log("[POST][GET-INITIAL-MESSAGES] body: ", body);

    //if (!body) return webAppResponder(null, ["CORE_INVALID_JSON"]);

    const useCase = new GetChatInitialMessagesUsecase(chatsRepository);

    const usecaseResponse = await useCase.execute(body);

    if (!usecaseResponse.success) {
      const errors = [];
      errors.push(usecaseResponse.data.errorCode);
      console.log("[[POST][GET-INITIAL-MESSAGES] return errors", errors);
      return webAppResponder(null, errors);
    }

    return webAppResponder(usecaseResponse);
  } catch (err: unknown) {
    console.error("Error on chats petition GET: ", err);
    return webAppResponder(null, ["CORE_INTERNAL_ERROR"]);
  }
}
