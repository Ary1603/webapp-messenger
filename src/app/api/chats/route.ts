/* Utils */
import { webAppResponder } from "@/utils/api/responderHandler";
/* Use cases */
import { GetUserChats } from "@/server/application/chats/get-user-chats/get-user-chats.usecase";
import { ChatInfraRepository } from "@/server/infrastructure/supabase/repositories/chat.infra-repository"; 
import { AuthInfraRepository } from "@/server/infrastructure/supabase/repositories/auth.infra-repository";

export async function GET() {
  try {
    const authRepository = new AuthInfraRepository();
    const chatsRepository = new ChatInfraRepository();

    const useCase = new GetUserChats(authRepository, chatsRepository);

    const usecaseResponse = await useCase.execute();

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
