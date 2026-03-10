/* Contract getUserChats */
export interface GetUserChatsInfraInput {
  user_id: string;
}

export interface GetUserChatsInfraResponse {
  chat_id: string;
  chat_type: string;
  //title: string;
  display_name: string;
  photo_url: null;
  created_at: string;
  last_message_at: string;
}

/* Contract getChatByName */
export interface GetChatByNameInfraInput {
  query: string;
}

/* Contract getDirectChatWithUser */
export interface GetDirectChatWithUserInfraInput {
  userB: string;
}

/* Contract getDirectChatBetweenUsers */
export interface GetDirectChatBetweenUsersInfraInput {
  userA: string;
  userB: string;
}

/* Contract createDirectChatWitUser */
export interface CreateDirectChatWitUserInfraInput {
  userB: string;
}

/* Contract getChatMessages */
export interface GetChatMessagesInfraInput {
  chatId: string;
  limit: number;
  cursor: null | string;
}

/* Contract sendMessage */
export interface SendMessageInfraInput {
  chatId: string;
  body: string;
  replyToId?: string | null;
  metadata?: Record<string, any> | null;
  clientId?: string | null;
}

export interface SendMessageInfraResponse {
  id: string;
  chatId: string;
  senderId: string;
  body: string | null;
  replyToId: string | null;
  metadata: Record<string, any> | null;
  createdAt: string;
  clientId: string | null;
}
