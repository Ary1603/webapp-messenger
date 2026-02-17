import { AuthRepository } from "@/server/application/auth/ports/auth.repository";
import { SearchInput } from "./search-conversations.input";
import { SearchReasult } from "./search-conversations.output";
import { SearchRepository } from "@/server/infrastructure/search/conversations/search-conversations.repository";
import { SearchConversationsChatMapper } from "./mappers/search-conversations-chat.mapper";
import { SearchConversationsUserMapper } from "./mappers/search-conversations-user.mapper";

export class Search {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly searchRepository: SearchRepository,
  ) {}

  async execute(input: SearchInput): Promise<SearchReasult> {
    const userCredentials = await this.authRepository.getCurrentUser();

    if (!userCredentials) {
      return {
        type: "ERROR",
        errorCode: "SEARCH_CONVERSATION_UNATHORIZED",
      };
    }

    const result = await this.searchRepository.searchConversations({
      query: input.query,
      pagination: {
        limit: input.pagination?.limit ?? 20,
        cursor: input.pagination?.cursor ?? null,
      },
    });

    if (result.type === "ERROR") {
      return {
        type: "ERROR",
        errorCode: "SEARCH_CONVERSATION_UNATHORIZED", //Create mapper
      };
    }

    return {
      type: "SUCCESS",
      data: {
        conversations: {
          chats: SearchConversationsChatMapper.toDomainList(result.data.chats),
          users: SearchConversationsUserMapper.toDomainList(result.data.users),
        },
      },
    };
  }
}
