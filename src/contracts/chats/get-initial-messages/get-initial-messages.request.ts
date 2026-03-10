export interface GetInitialMessagesRequest {
    chatId: string;
    limit: number;
    cursor: null | string;
}