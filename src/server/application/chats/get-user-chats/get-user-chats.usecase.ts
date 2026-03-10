/* Types */
import type { ChatRepository } from "../../ports/chat.repository";
import { AuthRepository } from "../../ports/auth.repository";
import { mapSupabaseGetUserChatsError } from "../../auth/mappers/get-user-chats-error.mapper";
import { UsecaseOutput } from "../../models/usecase-output.model";
import { BackendErrorModel } from "../../models/error.model";

export class GetUserChats {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly chatRepository: ChatRepository
  ) {}

  async execute(): Promise<UsecaseOutput<any, BackendErrorModel>> {
    const userCredentials = await this.authRepository.getCurrentUser();

    if (!userCredentials.success) {
      return {
        success: false,
        data: {
          errorCode: ""// Implement a default error
        },
      };
    }

    const { id } = userCredentials.data;

    const getUserChatsInfraResult = await this.chatRepository.getUserChats({user_id: id});

    if (!getUserChatsInfraResult.success) {
      return {
        success: false,
        data: {
          errorCode: mapSupabaseGetUserChatsError(getUserChatsInfraResult.data.errorCode)
        }
        
      };
    }

    const chats = getUserChatsInfraResult.data;

    return {
      success: true,
      data: {
        chats
      }
    };
  }
}
