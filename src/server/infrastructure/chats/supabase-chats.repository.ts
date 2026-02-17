/* Supabase */
import { createClient } from "@/lib/supabase/server/server";
/* Types */
import type { ChatsRepository } from "./chats.repository";
import { UserChatsInfraResult } from "../auth/models/user-chats.infra-result";
/* Mappers */

export class SupabaseChatsRepository implements ChatsRepository {
  async getUserChats(userId: string): Promise<UserChatsInfraResult> {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("get_user_chats", {
      p_user_id: userId,
    });

    if(error) {
        return {
            type: "ERROR",
            errorCode: 'error_chats',
            error: error
        }
    }

    return {
        type: "SUCCESS",
        data
    }
  }
}
