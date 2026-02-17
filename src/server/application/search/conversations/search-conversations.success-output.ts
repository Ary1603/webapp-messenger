

export interface Chat {
    chatId: string;
    chatName: string;
    photoUrl?: string;
}

export interface User {
    userId: string;
    userName: string;
    photoUrl?: string;
}

export interface SearchConversationsSuccessOutput {
    conversations: {
        chats: Chat[];
        users: User[]
    }
}