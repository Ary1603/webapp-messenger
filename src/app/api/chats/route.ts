/* Utils */
import { webAppResponder } from "@/utils/api/responderHandler";
/* Use cases */
import { GetUserChats } from "@/server/application/chats/get-user-chats.usecase";
import { SupabaseChatsRepository } from "@/server/infrastructure/chats/supabase-chats.repository";
import { SupabaseAuthRepository } from "@/server/infrastructure/auth/auth.infra-repository";

export async function GET() {
  try {
    const authRepository = new SupabaseAuthRepository();
    const chatsRepository = new SupabaseChatsRepository();

    const useCase = new GetUserChats(authRepository, chatsRepository);

    const result = await useCase.execute();

    if (result.type === "ERROR") {
      return webAppResponder(null, [result.errorCode]);
    }

    return webAppResponder({
      data: result.data,
    });
  } catch (err: unknown) {
    console.error("Error on chats petition GET: ", err);
    return webAppResponder(null, ["CORE_INTERNAL_ERROR"]);
  }
}
