//import { CreateUserRequest } from "@/types/api/user/user";
import { ApiClient } from "./clients/ApiClient";
/* Mappers */
//import { mapChatsDTOToChats } from "@/mappers/chats/chats.mapper";
/* Types & Schemas */
import type { LoginContract } from "@/contracts/auth/login/login.request";
//import type { SignUp } from "@/types/api/auth/signup";
import type { ApiResponse } from "@/types/transport/http/api-response";
//import type { LoginDataResponse } from "@/types/api/auth/login";


//* APIs
const LOGIN = "/api/auth/login";
const SIGNUP = "/api/auth/register";
const CHATS = "api/chats";

const ApiRepository = {
  async haseSessionActive() {
    const response = await ApiClient.get(LOGIN, { requiresAuth: false });
    return response.payload;
  },
  async initLogin(payload: LoginContract): Promise<ApiResponse<unknown>> {
    const response = await ApiClient.post<unknown>(LOGIN, payload);
    return response;
  },
  async gerUserChats() {
    const response = await ApiClient.get(CHATS);
    return response;
  },
  // async signUp(payload: CreateUserRequest) {
  //   const response = await ApiClient.post(SIGNUP, payload, {
  //     requiresAuth: false,
  //   });
  //   return response.payload;
  // },
  // async getInitialChats(): Promise<Chat[]> {
  //   const response = await ApiClient.get<ChatsDTO>(CHATS);
  //   const chatsDTO = response.payload.data;

  //   return mapChatsDTOToChats(chatsDTO);
  // },
};

export default ApiRepository;
