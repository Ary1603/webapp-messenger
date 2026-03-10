import { createClient } from "@/lib/supabase/server/server";
import { UserRepository } from "@/server/application/ports/user.repository";
import { PortError, PortResult } from "@/server/application/models/port.model";
import { UserProfile } from "@/server/application/user/models/user-profile";
import { RegisteredUser } from "@/server/application/user/models/registered-user";

export class UserInfraRepository implements UserRepository {
  async createUserProfile(
    input: UserProfile,
  ): Promise<PortResult<RegisteredUser, PortError>> {
    const supabase = await createClient();

    const { error, data } = await supabase.rpc("create_user_profile", {
      p_name: input.name,
      p_last_name_father: input.last_name_father,
      p_last_name_mother: input.last_name_mother,
      p_username: input.username,
      p_avatar_url: input.avatarUrl ?? null,
    });

    if (error) {
      return {
        success: false,
        data: {
          errorCode: error.code,
          description: error.message,
          error,
        },
      };
    }

    console.log("Data from 'supabase-user.repository.ts: ", data);

    return {
      success: true,
      data: {
        userId: "",
      },
    };
  }

  async getUsersByUsernameOrName(input: {
    query: string;
  }): Promise<PortResult<any, PortError>> {
    const supabase = await createClient();

    const { error, data } = await supabase.rpc("search_users", {
      p_query: input.query,
      p_limit: 10,
    });

    if (error) {
      return {
        success: false,
        data: {
          errorCode: "",
        },
      };
    }

    return {
      success: true,
      data,
    };
  }
}
