import { SupabaseSearchUserItem } from "@/server/infrastructure/search/models/supabase-search-user-item.infra";
import { User } from "../search-conversations.success-output";

export class SearchConversationsUserMapper {
  static toDomain(
    infraUser: SupabaseSearchUserItem
  ): User {
    return {
      userName: infraUser.username,
      photoUrl: infraUser.avatarUrl ?? undefined,
    };
  }

  static toDomainList(
    infraUsers: SupabaseSearchUserItem[]
  ): User[] {
    return infraUsers.map(this.toDomain);
  }
}