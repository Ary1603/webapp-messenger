/* Supabase */
import { createClient } from "@/lib/supabase/server/server";
/* Types */
import type { ChatRepository } from "@/server/application/ports/chat.repository";
import { PortError, PortResult } from "@/server/application/models/port.model";
/* Contracts */
import {
  CreateDirectChatWitUserInfraInput,
  GetChatByNameInfraInput,
  GetChatMessagesInfraInput,
  GetDirectChatBetweenUsersInfraInput,
  GetDirectChatWithUserInfraInput,
  GetUserChatsInfraInput,
  GetUserChatsInfraResponse,
  SendMessageInfraInput,
} from "../contracts/chat-infra-repository.contract";

export class ChatInfraRepository implements ChatRepository {
  async getUserChats(
    input: GetUserChatsInfraInput,
  ): Promise<PortResult<any, PortError>> {
    const supabase = await createClient();

    const { user_id } = input;

    const { data, error } = await supabase.rpc("get_user_chats", {
      p_user_id: user_id,
    });

    if (error) {
      return {
        success: false,
        data: {
          error: error,
          errorCode: "",
        },
      };
    }

    return {
      success: true,
      data: data as GetUserChatsInfraResponse,
    };
  }

  async getChatByName(
    input: GetChatByNameInfraInput,
  ): Promise<PortResult<any, PortError>> {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("search_user_chats", {
      p_query: input.query,
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

  async getDirectChatWithUser(
    input: GetDirectChatWithUserInfraInput,
  ): Promise<PortResult<any, PortError>> {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("get_direct_chat_with_user", {
      p_user_b: input.userB,
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

  async getDirectChatBetweenUsers(
    input: GetDirectChatBetweenUsersInfraInput,
  ): Promise<PortResult<any, PortError>> {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc(
      "get_direct_chat_between_users",
      {
        p_user_a: input.userA,
        p_user_b: input.userB,
      },
    );

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

  async createDirectChatWitUser(
    input: CreateDirectChatWitUserInfraInput,
  ): Promise<PortResult<any, PortError>> {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("create_direct_chat_with_user", {
      p_user_b: input.userB,
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

  async getChatMessages(
    input: GetChatMessagesInfraInput,
  ): Promise<PortResult<any, PortError>> {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("get_chat_messages", {
      p_chat_id: input.chatId,
      p_limit: input.limit,
      p_cursor: input.cursor,
    });

    if (error) {
      return {
        success: false,
        data: {
          error,
          errorCode: "",
        },
      };
    }

    return {
      success: true,
      data,
    };
  }

  async sendMessage(
    input: SendMessageInfraInput,
  ): Promise<PortResult<any, PortError>> {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("send_message", {
      p_chat_id: input.chatId,
      p_body: input.body,
      p_reply_to_id: input.replyToId ?? null,
      p_metadata: input.metadata ?? null,
      p_client_id: input.clientId ?? null,
    });

    if (error) {
      return {
        success: false,
        data: {
          error,
          errorCode: "",
        },
      };
    }

    const message = data?.[0];

    if (!message) {
      return {
        success: false,
        data: {
          errorCode: "MESSAGE_NOT_CREATED",
        },
      };
    }

    return {
      success: true,
      data: {
        id: message.id,
        chatId: message.chat_id,
        senderId: message.sender_id,
        body: message.body,
        replyToId: message.reply_to_id,
        metadata: message.metadata,
        createdAt: message.created_at,
        clientId: message.client_id,
      },
    };
  }
}
