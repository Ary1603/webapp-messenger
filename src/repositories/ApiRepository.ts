//import { CreateUserRequest } from "@/types/api/user/user";
import { ApiClient } from "./clients/ApiClient";
import type { SearchConversationsRequest } from "@/contracts/search/conversations/search-conversations.request";
import type { SearchConversationsResponse } from "@/contracts/search/conversations/search-conversations.response";
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
//import type { LoginDataResponse } from "@/types/api/auth/login";

//* APIs
const LOGIN = "/api/auth/login";
const LOGOUT = "/api/auth/logout";
const REGISTER_USER = "/api/auth/register";
const CHATS = "/api/chats";
const SEARCH_CONVERSATIONS = "api/search/conversations";

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
  async gerUserChats() {
    const response = await ApiClient.get(CHATS);
    return response;
  },
  async searchConversations(
    payload: SearchConversationsRequest,
  ): Promise<ApiResponse<SearchConversationsResponse>> {
    const response = await ApiClient.get<SearchConversationsResponse>(
      `${SEARCH_CONVERSATIONS}?query=${payload.query}`
    );

    return response;
  },
};

export default ApiRepository;
