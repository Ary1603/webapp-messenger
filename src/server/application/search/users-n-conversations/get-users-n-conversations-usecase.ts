//import { AuthRepository } from "../../ports/auth.repository";
import { ChatRepository } from "../../ports/chat.repository";
import { UserRepository } from "../../ports/user.repository";
import { BackendErrorModel } from "../../models/error.model";
import { UsecaseOutput } from "../../models/usecase-output.model";

export class SearchUsersNConversations {
  constructor(
    //private readonly authRepository: AuthRepository
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: {
    query: string | null;
  }): Promise<UsecaseOutput<any, BackendErrorModel>> {
    if (!input.query) {
      return {
        success: false,
        data: { errorCode: "No query" },
      };
    }

    const query = input.query; // aquí ya es string

    const [responseChatsSearched, responseUserSearched] = await Promise.all([
      this.chatRepository.getChatByName({ query }),
      this.userRepository.getUsersByUsernameOrName({ query }),
    ]);

    const chatsFailed = !responseChatsSearched.success;
    const usersFailed = !responseUserSearched.success;

    if (chatsFailed && usersFailed) {
      return {
        success: false,
        data: {
          errorCode: "SEARCH_FAILED",
        },
      };
    }

    return {
      success: true,
      data: {
        chats: chatsFailed ? [] : responseChatsSearched?.data,
        users: usersFailed ? [] : responseUserSearched?.data,
      },
    };
  }
}
