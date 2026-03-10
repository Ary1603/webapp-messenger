//import { CreateUserRequest } from "@/types/api/user/user";
import { ApiClient } from "./clients/ApiClient";
import type { SearchConversationsRequest } from "@/contracts/search/conversations/search-conversations.request";
import type { SearchUsersNChatsResponse } from "@/contracts/search/conversations/search-conversations.response";
/* Mappers */
//import { mapChatsDTOToChats } from "@/mappers/chats/chats.mapper";
/* Types & Schemas */
import type { RegisterRequest } from "@/contracts/auth/register/register.request";
// import type { LoginContract } from "@/contracts/auth/login/login.request";
//import type { SignUp } from "@/types/api/auth/signup";
import type { ApiResponse } from "@/types/transport/http/api-response";
import { RegisterResponse } from "@/contracts/auth/register/register.response";
import { LoginResponse } from "@/contracts/auth/login/login.response";
import { LoginRequest } from "@/contracts/auth/login/login.request";
import { UserChatsResponse } from "@/contracts/chats/user-chats.response";
import { GetInitialMessagesRequest } from "@/contracts/chats/get-initial-messages/get-initial-messages.request";
import { SendMessageResponse } from "@/contracts/chats/send-message/send-message.response";
import { SendMessageRequest } from "@/contracts/chats/send-message/send-message.request";
//import type { LoginDataResponse } from "@/types/api/auth/login";

//* APIs
const LOGIN = "/api/auth/login";
const LOGOUT = "/api/auth/logout";
const REGISTER_USER = "/api/auth/register";
const CHATS = "/api/chats";
const SEARCH_USERS_N_CHATS = "/api/search/users-n-chats";
const GET_OR_CREATE_DIRECT_CHAT = "/api/chats/get-or-create-direct-chat"
const GET_INITIAL_CHAT_MESSAGES = "/api/chats/get-initial-messages"
const SEND_MESSAGE = "/api/send-message"

const ApiRepository = {
  async logout(): Promise<void> {
    await ApiClient.get(LOGOUT);
    return;
  },
  async haseSessionActive() {
    const response = await ApiClient.get(LOGIN, { requiresAuth: false });
    return response.payload;
  },
  async initLogin(payload: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await ApiClient.post<LoginResponse>(LOGIN, payload);
    return response;
  },
  async registerUser(payload: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    const response = await ApiClient.post<RegisterResponse>(REGISTER_USER, payload);
    return response;
  },
  async gerUserChats(): Promise<ApiResponse<UserChatsResponse>> {
    const response = await ApiClient.get<UserChatsResponse>(CHATS);
    return response;
  },
  async searchUsersNChats(
    payload: SearchConversationsRequest
  ): Promise<ApiResponse<SearchUsersNChatsResponse>> {
    const response = await ApiClient.get<SearchUsersNChatsResponse>(
      `${SEARCH_USERS_N_CHATS}?query=${payload.query}`
    );
    return response;
  },
  async getOrCreateDirectChatBetweenUsers(payload: any): Promise<any> {
    const response = await ApiClient.post<any>(GET_OR_CREATE_DIRECT_CHAT, payload);
    return response.payload;
  },
  async getChatInitialMessages(payload: GetInitialMessagesRequest): Promise<ApiResponse<any>> {
    const response = await ApiClient.post<any>(GET_INITIAL_CHAT_MESSAGES, payload);
    return response;
  },
  async sendMessage(payload: SendMessageRequest): Promise<ApiResponse<SendMessageResponse>> {
    const response = await ApiClient.post<SendMessageResponse>(SEND_MESSAGE, payload);
    return response;
  }
};

export default ApiRepository;
