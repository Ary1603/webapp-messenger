import { randomUUID } from "crypto";
import { BackendErrorModel } from "../../models/error.model";
import { UsecaseOutput } from "../../models/usecase-output.model";
import { ChatRepository } from "../../ports/chat.repository";

export type SendMessageUseCaseInput = {
  chatId: string;
  body?: string;
  replyToId?: string;
  metadata?: Record<string, unknown>;
  clientId?: string;
};

export type SendMessageUseCaseContext = {
  currentUserId: string;
};

export class SendMessageUsecase {
  constructor(private readonly chatRepository: ChatRepository) {}

  async execute(
    input: SendMessageUseCaseInput,
    context: SendMessageUseCaseContext
  ): Promise<UsecaseOutput<any, BackendErrorModel>> {
    const { chatId, body, replyToId, metadata } = input;
    const { currentUserId } = context;

    // 1️⃣ Basic guards
    if (!currentUserId) {
      return {
        success: false,
        data: {
          errorCode: "AUTH-UNAUTHORIZED",
          //error: "User is not authenticated",
        },
      };
    }

    if (!chatId) {
      return {
        success: false,
        data: {
          errorCode: "CHAT-ID-REQUIRED",
          //error: "Chat id is required",
        },
      };
    }

    // 2️⃣ Business rule: message must have content (body or metadata)
    const hasBody = typeof body === "string" && body.trim().length > 0;
    const hasMetadata = metadata && Object.keys(metadata).length > 0;

    if (!hasBody && !hasMetadata) {
      return {
        success: false,
        data: {
          errorCode: "MESSAGE-CONTENT-REQUIRED",
          //error: "Message must contain body or metadata",
        },
      };
    }

    // 3️⃣ Generate clientId for idempotency if not provided
    const clientId = input.clientId ?? randomUUID();

    // 4️⃣ Call repository
    const sendMessageResponse = await this.chatRepository.sendMessage({
      chatId,
      body: hasBody ? body!.trim() : "",
      replyToId,
      metadata,
      clientId,
    });

    if (!sendMessageResponse.success) {
      return {
        success: false,
        data: sendMessageResponse.data,
      };
    }

    return {
      success: true,
      data: sendMessageResponse.data,
    };
  }
}
