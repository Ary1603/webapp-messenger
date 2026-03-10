import { BackendErrorModel } from "../../models/error.model";
import { UsecaseOutput } from "../../models/usecase-output.model";
import { ChatRepository } from "../../ports/chat.repository";
import { GetOrCreateDirectChatUsecaseInput } from "./get-or-create-direct-chat.input";


export class GetOrCreateDirectChatUsecase {
    constructor(
        private readonly chatRepository: ChatRepository
    ) {}

    async execute(
        input: GetOrCreateDirectChatUsecaseInput
    ): Promise<UsecaseOutput<any, BackendErrorModel>> {

        // Validate direct chat

        const getDirectChatWithUserResponse = await this.chatRepository.getDirectChatWithUser({userB: input.userB_id});

        if(!getDirectChatWithUserResponse.success) {
            return {
                success: false,
                data: {
                    errorCode: ""
                }
            }
        }

        console.log("[GetOrCreateDirectChatUsecase] getDirectChatWithUserResponse: ", getDirectChatWithUserResponse.data);
        if(getDirectChatWithUserResponse.data.length > 0) {
            console.log("Entre al if");
            return {
                success: true,
                data: getDirectChatWithUserResponse.data
            }
        }

        // Continue logic create chat


        const createDirectChatResponse = await this.chatRepository.createDirectChatWitUser({userB: input.userB_id});

        console.log("[GetOrCreateDirectChatUsecase] createDirectChatResponse: ", createDirectChatResponse);
        

        return {
            success: true,
            data: createDirectChatResponse.data
        }
    }
} 
