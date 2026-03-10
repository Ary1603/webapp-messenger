import { CreateDirectChatWitUserInfraInput, GetChatByNameInfraInput, GetChatMessagesInfraInput, GetDirectChatBetweenUsersInfraInput, GetDirectChatWithUserInfraInput, GetUserChatsInfraInput, GetUserChatsInfraResponse, SendMessageInfraInput, SendMessageInfraResponse } from "@/server/infrastructure/supabase/contracts/chat-infra-repository.contract";
import { PortError, PortResult } from "../models/port.model";


export interface ChatRepository {
    getUserChats(input: GetUserChatsInfraInput): Promise<PortResult<GetUserChatsInfraResponse, PortError>>;
    getChatByName(input: GetChatByNameInfraInput): Promise<PortResult<any, PortError>>;
    getDirectChatWithUser(input: GetDirectChatWithUserInfraInput): Promise<PortResult<any, PortError>>;
    getDirectChatBetweenUsers(input: GetDirectChatBetweenUsersInfraInput): Promise<PortResult<any, PortError>>;
    createDirectChatWitUser(input: CreateDirectChatWitUserInfraInput): Promise<PortResult<any, PortError>>;
    getChatMessages(input: GetChatMessagesInfraInput): Promise<PortResult<any, PortError>>;
    sendMessage(input: SendMessageInfraInput): Promise<PortResult<SendMessageInfraResponse, PortError>>;
}