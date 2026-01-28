/* Types */
import type { UserChatsInfraResult } from "../auth/models/user-chats.infra-result"

export interface ChatsRepository {
    getUserChats(userId: string): Promise<UserChatsInfraResult>;
}