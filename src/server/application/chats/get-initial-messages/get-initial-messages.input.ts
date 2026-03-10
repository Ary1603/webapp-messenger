export interface GetChatInitialMessagesUsecaseInput {
    chatId: string;
    limit: number;
    cursor: null | string;
    // oldestMessage: {
    //     created_at: string;
    // }
}
