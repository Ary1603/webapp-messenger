import { BackendErrorModel } from "../../models/error.model";
import { UsecaseOutput } from "../../models/usecase-output.model";
import { ChatRepository } from "../../ports/chat.repository";
import { GetChatInitialMessagesUsecaseInput } from "./get-initial-messages.input";


export class GetChatInitialMessagesUsecase {
    constructor(
        private readonly chatRepository: ChatRepository
    ) {}

    async execute(input: GetChatInitialMessagesUsecaseInput): Promise<UsecaseOutput<any, BackendErrorModel>> {

        if(!input.chatId) {
            return {
                success: false,
                data: {
                    errorCode: "AUTH_invalid_user_id"
                }
            }
        }

        const getInitialMessages = await this.chatRepository.getChatMessages({
            chatId: input.chatId,
            limit: input.limit,
            cursor: input.cursor
        })

        if(!getInitialMessages.success) {
            return {
                success: false,
                data: {
                    errorCode: ""
                }
            }
        }

        return {
            success: true,
            data: {}
        }
    }
}