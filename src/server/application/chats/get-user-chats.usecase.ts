/* Types */
import type { ChatsRepository } from "@/server/infrastructure/chats/chats.repository";
import type { GetUserChatsResult } from "./get-user-chats.result";
import { AuthRepository } from "@/server/application/auth/ports/auth.repository";
import { mapSupabaseGetUserChatsError } from "../auth/mappers/get-user-chats-error.mapper";

export class GetUserChats {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly chatsRepository: ChatsRepository
  ) {}

  async execute(): Promise<GetUserChatsResult> {
    console.log(" ---------- get-user-chats.usecase.ts ---------- ");
    const userCredentials = await this.authRepository.getCurrentUser();

    if (!userCredentials) {
      return {
        type: "ERROR",
        errorCode: "CHATS_UNAUTHORIZED",
      };
    }

    const { id } = userCredentials;

    const infraResult = await this.chatsRepository.getUserChats(id);

    if (infraResult.type === "ERROR") {
      return {
        type: "ERROR",
        errorCode: mapSupabaseGetUserChatsError(infraResult.errorCode),
      };
    }

    const chats = infraResult.data.chats;

    console.log("userChats: ");
    console.log(" ---------- Fin get-user-chats.usecase.ts ---------- ");

    return {
      type: "SUCCESS",
      data: {
        chats
      },
    };
  }
}
